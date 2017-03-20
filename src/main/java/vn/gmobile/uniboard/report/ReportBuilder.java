package vn.gmobile.uniboard.report;

import static net.sf.dynamicreports.report.builder.DynamicReports.export;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
//import net.sf.dynamicreports.jasper.builder.export.JasperHtmlExporterBuilder;
//import net.sf.dynamicreports.jasper.builder.export.JasperPdfExporterBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperXlsExporterBuilder;
import net.sf.dynamicreports.jasper.builder.export.JasperXlsxExporterBuilder;
import net.sf.dynamicreports.report.exception.DRException;
import net.sf.jasperreports.engine.JRDataSource;


public abstract class ReportBuilder {
	private JRDataSource _dataSource;
	private JasperReportBuilder _reportBuilder;
	

	protected abstract JRDataSource createDataSource();
	
	protected abstract JasperReportBuilder buildReport();
	
	public void buildExcelReport(String filePath) {
		try {
			if (_dataSource==null)
				_dataSource = createDataSource();
			if (_reportBuilder==null)
				_reportBuilder = buildReport().setDataSource(_dataSource);
			JasperXlsxExporterBuilder xlsxExporter = export.xlsxExporter(filePath)
			                                             .setDetectCellType(true)
			                                             .setIgnorePageMargins(true)
			                                             .setWhitePageBackground(false)
			                                             .setRemoveEmptySpaceBetweenColumns(true);
			_reportBuilder.toXlsx(xlsxExporter);
		} catch (DRException e) {
			e.printStackTrace();
		}
	}
	
	
	
	
	

}
