import { Injectable } from '@nestjs/common';
import { QuizHttpService } from '../quiz.http.service';
import { ReportsService } from '../../reports/reports.service';
import { GenerateReportDto } from '../../reports/dto/generate-report.dto';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class GenerateQuizReportService {
  constructor(
    private quizHttpService: QuizHttpService,
    private reportsService: ReportsService,
  ) {}

  async generateQuizReport(id: number): Promise<void> {
    try {
      // Obtener los datos del cuestionario específico por ID
      const quizData = await this.quizHttpService.getQuizById(id);

      // Preparar los datos para el reporte específico
      const reportDto: GenerateReportDto = {
        entityName: 'Quiz',
        data: this.formatQuizData(quizData),
      };

      // Generar el contenido del informe en formato texto
      const reportContent = await this.reportsService.generateReport(reportDto);

      // Crear el contenido del informe en formato PDF
      const pdfBuffer = await this.generatePdf(reportContent);

      // Guardar el informe como archivo PDF
      await this.reportsService.saveReport(pdfBuffer, `quiz_report_${id}.pdf`);
    } catch (error) {
      throw new Error(`Error generating quiz report: ${error.message}`);
    }
  }

  async generateGeneralQuizReport(): Promise<void> {
    try {
      // Obtener todos los cuestionarios
      const quizzes = await this.quizHttpService.getAllQuizzes();

      // Preparar los datos para el informe general
      const generalReportDto: GenerateReportDto[] = quizzes.map((quiz) => ({
        entityName: 'Quiz',
        data: this.formatQuizData(quiz),
      }));

      // Generar el contenido del informe en formato texto para cada cuestionario y concatenar
      let reportContent = '';
      for (const reportDto of generalReportDto) {
        reportContent += await this.reportsService.generateReport(reportDto) + '\n\n';
      }

      // Crear el contenido del informe en formato PDF
      const pdfBuffer = await this.generatePdf(reportContent);

      // Guardar el informe como archivo PDF
      await this.reportsService.saveReport(pdfBuffer, `general_quiz_report.pdf`);
    } catch (error) {
      throw new Error(`Error generating general quiz report: ${error.message}`);
    }
  }

  private formatQuizData(quizData: any): any {
    // Formatear los datos del cuestionario según sea necesario
    return {
      id: quizData.id,
      title: quizData.title,
      description: quizData.description,
      difficulty: quizData.difficultyLevel,
      createdAt: quizData.createdAt,
      // Agrega otros campos relevantes si es necesario
    };
  }

  private async generatePdf(reportContent: string): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument();
      const buffers: Buffer[] = [];

      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      doc.text(reportContent);
      doc.end();
    });
  }
}
