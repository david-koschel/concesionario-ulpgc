package ps.backend.service;

import com.lowagie.text.*;

import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.html.WebColors;
import com.lowagie.text.pdf.*;
import jakarta.mail.util.ByteArrayDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import ps.backend.entity.userVehicle.UserConfiguration;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;

@Service
public class PdfService {

    private static final Logger log = LoggerFactory.getLogger(PdfService.class);

    private final Font headBoldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9, WebColors.getRGBColor("#FFFFFF"));
    private final Font headFont = FontFactory.getFont(FontFactory.HELVETICA, 9, WebColors.getRGBColor("#FFFFFF"));
    private final Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
    private final Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 10);
    private final Font endBoldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
    private final Font endNormalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
    private final Font bold = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

    private static final String LOGO_IMG = "img/LOGO.png";
    private static final Color GRIS = WebColors.getRGBColor("#4B4947");

    public PdfService() {
    }

    public ByteArrayDataSource generateInvoicePDF(UserConfiguration userConfiguration) {
        PdfPTable pdfPTable = new PdfPTable(12);

        this.createInvoiceHeader(pdfPTable);
        this.createInvoiceBody(pdfPTable, userConfiguration);

        ByteArrayDataSource dataSource = generatePdfByteArrayDataSourceFromPdfPTable(pdfPTable);
        dataSource.setName(
                "Factura_Concesionario_ULPGC.pdf"
        );

        return dataSource;
    }

    private void createInvoiceHeader(PdfPTable table) {
        table.setWidthPercentage(100);
        PdfPCell cell;
        try {
            Image img = Image.getInstance(new ClassPathResource(LOGO_IMG).getURL());
            cell = new PdfPCell(img, true);
            cell.setColspan(5);
            cell.setRowspan(3);
            cell.setBackgroundColor(GRIS);
            cell.setBorder(0);
            this.addAlignCell(table, cell, Element.ALIGN_CENTER);

            String[] titles = {"Correo Electrónico: ", "Dirección: ", "Teléfono: "};
            String[] fields = {"ulpgc.concesionario@gmail.com", "Campus de Tafira, 35017 Las Palmas de Gran Canaria", "(+34) 928 xxx 105"};
            for (int i = 0; i < titles.length; i++) {
                cell = this.addInlineParagraph(titles[i], fields[i], headFont, headFont);
                cell.setBackgroundColor(GRIS);
                cell.setColspan(7);
                cell.setPadding(0);
                cell.setPaddingRight(10);
                if (i == 0) {
                    cell.setVerticalAlignment(Element.ALIGN_BASELINE);
                } else if (i == 1) {
                    cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                } else {
                    cell.setVerticalAlignment(Element.ALIGN_TOP);
                    cell.setPaddingBottom(10);
                }
                table.addCell(cell);
            }
        } catch (IOException e) {
            log.error("Error creating header for pdf", e.getMessage());
        }
    }

    private void createInvoiceBody(PdfPTable table, UserConfiguration userVehicle) {
        PdfPCell cell;

        cell = this.addInlineParagraph("Factura: ", "2024-04-" + userVehicle.getId(), boldFont, normalFont);
        cell.setColspan(12);
        cell.setVerticalAlignment(Element.ALIGN_BASELINE);
        table.addCell(cell);

        cell = this.addInlineParagraph("Fecha: ", String.valueOf(new Date()), boldFont, normalFont);
        cell.setColspan(12);
        cell.setVerticalAlignment(Element.ALIGN_TOP);
        cell.setPaddingBottom(10);
        table.addCell(cell);

        this.addDivider(table);

        cell = new PdfPCell(new Paragraph("Descripción", bold));
        cell.setColspan(6);
        cell.setBorder(0);
        this.addAlignCell(table, cell, Element.ALIGN_LEFT);

        cell = new PdfPCell(new Paragraph("Cantidad", bold));
        cell.setColspan(2);
        cell.setBorder(0);
        this.addAlignCell(table, cell, Element.ALIGN_CENTER);

        cell = new PdfPCell(new Paragraph("Precio Unitario", bold));
        cell.setColspan(2);
        cell.setBorder(0);
        this.addAlignCell(table, cell, Element.ALIGN_CENTER);

        cell = new PdfPCell(new Paragraph("Importe", bold));
        cell.setColspan(2);
        cell.setBorder(0);
        this.addAlignCell(table, cell, Element.ALIGN_CENTER);

        this.addDivider(table);

        float totalPrice = this.generateBoughtElementsRows(table, userVehicle);

        this.addDivider(table);

        cell = this.addInlineParagraph("IMPORTE TOTAL (€): ", String.format("%.2f", totalPrice), endBoldFont, endNormalFont);
        cell.setColspan(12);
        cell.setPaddingRight(20);
        this.addAlignCell(table, cell, 2);
    }

    private float generateBoughtElementsRows(PdfPTable table, UserConfiguration userConfiguration) {
        PdfPCell cell;

        cell = new PdfPCell(new Phrase(String.format(
                "%s %s",
                userConfiguration.getSelectedVehicle().getBrand(),
                userConfiguration.getSelectedVehicle().getModel()
        ), normalFont));
        cell.setColspan(6);
        cell.setBorder(0);
        this.addAlignCell(table, cell, Element.ALIGN_LEFT);

        cell = new PdfPCell(new Phrase("1"));
        cell.setColspan(2);
        cell.setBorder(0);
        this.addAlignCell(table, cell, Element.ALIGN_CENTER);

        cell = new PdfPCell(new Phrase(String.format("%.2f", userConfiguration.getSelectedVehicle().getBasePrice())));
        cell.setColspan(2);
        cell.setBorder(0);
        this.addAlignCell(table, cell, Element.ALIGN_CENTER);

        cell = new PdfPCell(new Phrase(String.format("%.2f", userConfiguration.getSelectedVehicle().getBasePrice())));
        cell.setColspan(2);
        cell.setBorder(0);
        this.addAlignCell(table, cell, Element.ALIGN_CENTER);

        return 12f;
    }

    private ByteArrayDataSource generatePdfByteArrayDataSourceFromPdfPTable(PdfPTable table) {
        Document document = new Document();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        final PdfWriter instance = PdfWriter.getInstance(document, outputStream);

        document.open();
        instance.getInfo().put(new PdfName(""), new PdfString(Document.getVersion()));
        document.add(table);
        document.close();

        byte[] bytes = outputStream.toByteArray();
        return new ByteArrayDataSource(bytes, "application/pdf");
    }

    private PdfPCell addInlineParagraph(String title, String field, Font titleFont, Font fieldFont) {
        PdfPCell cell = new PdfPCell();

        Paragraph p = new Paragraph();
        p.add(new Chunk(title, titleFont));
        p.add(new Chunk(field, fieldFont));
        p.setAlignment(Element.ALIGN_RIGHT);
        cell.addElement(p);
        cell.setBorder(0);

        return cell;
    }

    private void addDivider(PdfPTable table) {
        PdfPCell separatorCell = new PdfPCell();
        separatorCell.setColspan(12);
        separatorCell.setBorder(0);
        separatorCell.setBorderWidthBottom(2);
        separatorCell.setBorderColor(GRIS);
        table.addCell(separatorCell);
    }

    private void addAlignCell(PdfPTable table, PdfPCell cell, int align) {
        cell.setFixedHeight(23);
        cell.setHorizontalAlignment(align);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.addCell(cell);
    }
}
