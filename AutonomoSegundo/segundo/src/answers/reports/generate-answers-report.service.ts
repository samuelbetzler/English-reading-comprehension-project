import { Injectable } from '@nestjs/common';
import { AnswersHttpService } from '../answers.http.service';
import { ReportsService } from '../../reports/reports.service';
import { GenerateReportDto } from '../../reports/dto/generate-report.dto';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class GenerateAnswersReportService {
  constructor(
    private answersHttpService: AnswersHttpService,
    private reportsService: ReportsService,
  ) {}

  async generateAnswersReport(questionId: number): Promise<void> {
    try {
      const answersData = await this.answersHttpService.getAnswersByQuestionId(questionId);

      if (!answersData || answersData.length === 0) {
        console.warn(`No answers found for question ID ${questionId}`);
        const reportContent = `No answers found for question ID ${questionId}`;
        const pdfBuffer = await this.generatePdf(reportContent);
        await this.reportsService.saveReport(pdfBuffer, `empty_answers_report_${questionId}.pdf`);
        return;
      }

      const reportDto: GenerateReportDto = {
        entityName: 'Answers',
        data: this.formatAnswersData(answersData),
      };

      const reportContent = await this.reportsService.generateReport(reportDto);
      const pdfBuffer = await this.generatePdf(reportContent);
      await this.reportsService.saveReport(pdfBuffer, `answers_report_${questionId}.pdf`);
      
      console.log(`Report generated successfully for question ID ${questionId}`);
    } catch (error) {
      console.error(`Error generating answers report:`, error);
      throw new Error(`Error generating answers report: ${error.message}`);
    }
  }
  async generateGeneralAnswersReport(): Promise<void> {
    try {
      // Obtener todas las respuestas
      const answersData = await this.answersHttpService.getAllAnswers();
      
      // Verificar y asegurar que answersData es un arreglo de respuestas
      const answers = Array.isArray(answersData) ? answersData : [answersData];
  
      // Preparar los datos para el informe general
      const generalReportDto: GenerateReportDto[] = answers.map((answer) => ({
        entityName: 'Answers',
        data: this.formatAnswersData(answer),
      }));
  
      // Generar el contenido del informe en formato texto para cada respuesta y concatenar
      const reportContents = await Promise.all(generalReportDto.map(dto => this.reportsService.generateReport(dto)));
      const reportContent = reportContents.join('\n\n');
  
      // Crear el contenido del informe en formato PDF
      const pdfBuffer = await this.generatePdf(reportContent);
  
      // Guardar el informe como archivo PDF
      await this.reportsService.saveReport(pdfBuffer, `general_answers_report.pdf`);
    } catch (error) {
      throw new Error(`Error generating general answers report: ${error.message}`);
    }
  }
  
  private formatAnswersData(answersData: any): any {
    // Formatear los datos de las respuestas según sea necesario
    if (Array.isArray(answersData)) {
      // Si answersData es un arreglo de respuestas
      return answersData.map(answer => ({
        id: answer.id,
        questionId: answer.questionId,
        text: answer.text,
        isCorrect: answer.isCorrect,
        createdAt: answer.createdAt,
        // Agrega otros campos relevantes si es necesario
      }));
    } else {
      // Si answersData es una respuesta individual o undefined/null
      if (answersData) {
        return [{
          id: answersData.id,
          questionId: answersData.questionId,
          text: answersData.text,
          isCorrect: answersData.isCorrect,
          createdAt: answersData.createdAt,
          // Agrega otros campos relevantes si es necesario
        }];
      } else {
        // Manejar el caso donde no hay datos de respuesta
        return [];
      }
    }
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
