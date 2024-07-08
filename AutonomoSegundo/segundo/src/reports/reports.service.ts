import { Injectable } from '@nestjs/common';
import { GenerateReportDto } from './dto/generate-report.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ReportsService {
  async generateReport(data: GenerateReportDto): Promise<string> {
    // Generar un reporte detallado
    const reportContent = `
      Report generated at: ${new Date().toISOString()}
      Entity: ${data.entityName}
      Data: ${JSON.stringify(data.data, null, 2)}
      Additional Info: Report for entity ${data.entityName} created with ${Object.keys(data.data).length} entries.
    `;

    return reportContent;
  }

  async saveReport(pdfBuffer: Buffer, fileName: string): Promise<void> {
    const filePath = path.join(__dirname, '..', 'reports', fileName);

    try {
      // Crear el directorio si no existe
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      // Escribir el contenido del reporte en el archivo
      fs.writeFileSync(filePath, pdfBuffer);
      console.log(`Report saved as ${filePath}`);
    } catch (error) {
      console.error(`Failed to save report: ${error.message}`);
      throw new Error('Failed to save report');
    }
  }
}
