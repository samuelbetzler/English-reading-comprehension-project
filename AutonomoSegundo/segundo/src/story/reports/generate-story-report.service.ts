import { Injectable } from '@nestjs/common';
import { StoryHttpService } from '../story.http.service';
import { ReportsService } from '../../reports/reports.service';
import { GenerateReportDto } from '../../reports/dto/generate-report.dto';
import * as PDFDocument from 'pdfkit';

@Injectable()
export class GenerateStoryReportService {
  constructor(
    private storyHttpService: StoryHttpService,
    private reportsService: ReportsService,
  ) {}

  async generateStoryReport(id: number): Promise<void> {
    try {
      // Obtener los datos de la historia por su ID
      const storyData = await this.storyHttpService.getStoryById(id);

      // Preparar los datos para el reporte
      const reportDto: GenerateReportDto = {
        entityName: 'Story',
        data: this.formatStoryData(storyData),
      };

      // Generar el contenido del informe en formato texto
      const reportContent = await this.reportsService.generateReport(reportDto);

      // Crear el contenido del informe en formato PDF
      const pdfBuffer = await this.generatePdf(reportContent);

      // Guardar el informe como archivo PDF
      await this.reportsService.saveReport(pdfBuffer, `story_report_${id}.pdf`);
    } catch (error) {
      throw new Error(`Error generating story report: ${error.message}`);
    }
  }

  async generateGeneralStoryReport(): Promise<void> {
    try {
      // Obtener todas las historias
      const stories = await this.storyHttpService.getAllStories();

      // Preparar los datos para el informe general
      const generalReportDto: GenerateReportDto[] = stories.map((story) => ({
        entityName: 'Story',
        data: this.formatStoryData(story),
      }));

      // Generar el contenido del informe en formato texto para cada historia y concatenar
      const reportContents = await Promise.all(generalReportDto.map(dto => this.reportsService.generateReport(dto)));
      const reportContent = reportContents.join('\n\n');

      // Crear el contenido del informe en formato PDF
      const pdfBuffer = await this.generatePdf(reportContent);

      // Guardar el informe como archivo PDF
      await this.reportsService.saveReport(pdfBuffer, `general_story_report.pdf`);
    } catch (error) {
      throw new Error(`Error generating general story report: ${error.message}`);
    }
  }

  private formatStoryData(storyData: any): any {
    // Formatear los datos de la historia según sea necesario
    return {
      id: storyData.id,
      title: storyData.title,
      author: storyData.author,
      text: storyData.text,
      quizId: storyData.quizId,
      createdAt: storyData.createdAt,
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
