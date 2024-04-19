package ps.backend.service;

import com.lowagie.text.Document;
import com.lowagie.text.Font;

import com.lowagie.text.FontFactory;
import com.lowagie.text.pdf.PdfName;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfString;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.mail.util.ByteArrayDataSource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PDFService {

    private final Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12, WebColors.getRGBColor("#F1E61F"));
    private final Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
    private final Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 10);

    public ByteArrayDataSource generateInvoicePDF(){
        PdfPTable pdfPTable = new PdfPTable(6);

        String title = "FACTURA DE CONCESIONARIO ULPGC";


        ByteArrayDataSource dataSource = generatePdfByteArrayDataSourceFromPdfPTable(pdfPTable);
    }

    private void createBasicHeader(PdfPTable table){
        table.setWidthPercentage(100);
        try {

        } catch (IOException e){

        }
    }

    private ByteArrayDataSource generatePdfByteArrayDataSourceFromPdfPTable(PdfPTable table) {
        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        final PdfWriter instance = PdfWriter.getInstance(document, outputStream);

        document.open();
        instance.getInfo().put(new PdfName("PRUEBA NOMBRE"), new PdfString(Document.getVersion()));
        document.add(table);
        document.close();

        byte[] bytes = outputStream.toByteArray();
        return new ByteArrayDataSource(bytes, "application/pdf");
    }
}
