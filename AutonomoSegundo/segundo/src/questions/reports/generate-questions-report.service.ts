import { Injectable } from '@nestjs/common';
import { QuestionsHttpService } from '../questions.http.service'; // Ajusta según tu servicio HTTP para preguntas
import { ReportsService } from '../../reports/reports.service';
import { GenerateReportDto } from '../../reports/dto/generate-report.dto';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class GenerateQuestionsReportService {
  constructor(
    private questionsHttpService: QuestionsHttpService,
    private reportsService: ReportsService,
  ) {}

  async generateQuestionsReport(id: number): Promise<void> {
    try {
      // Obtener los datos de la pregunta por su ID
      const questionData = await this.questionsHttpService.getQuestionById(id);

      // Preparar los datos para el reporte
      const reportDto: GenerateReportDto = {
        entityName: 'Question',
        data: this.formatQuestionData(questionData),
      };

      // Generar el contenido del informe en formato texto
      const reportContent = await this.reportsService.generateReport(reportDto);

      // Crear el contenido del informe en formato PDF
      const pdfBuffer = await this.generatePdf(reportContent);

      // Guardar el informe como archivo PDF
      await this.reportsService.saveReport(pdfBuffer, `question_report_${id}.pdf`);
    } catch (error) {
      throw new Error(`Error generating question report: ${error.message}`);
    }
  }

  async generateGeneralQuestionsReport(): Promise<void> {
    try {
      // Obtener todas las preguntas
      const questions = await this.questionsHttpService.getAllQuestions();

      // Preparar los datos para el informe general
      const generalReportDto: GenerateReportDto[] = questions.map((question) => ({
        entityName: 'Question',
        data: this.formatQuestionData(question),
      }));

      // Generar el contenido del informe en formato texto para cada pregunta y concatenar
      const reportContents = await Promise.all(generalReportDto.map(dto => this.reportsService.generateReport(dto)));
      const reportContent = reportContents.join('\n\n');

      // Crear el contenido del informe en formato PDF
      const pdfBuffer = await this.generatePdf(reportContent);

      // Guardar el informe como archivo PDF
      await this.reportsService.saveReport(pdfBuffer, `general_question_report.pdf`);
    } catch (error) {
      throw new Error(`Error generating general question report: ${error.message}`);
    }
  }

  private formatQuestionData(questionData: any): any {
    // Formatear los datos de la pregunta según sea necesario
    return {
      id: questionData.id,
      text: questionData.text,
      quizId: questionData.quizId,
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
