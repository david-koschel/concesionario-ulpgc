package ps.backend.util;

import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.html.WebColors;
import com.lowagie.text.pdf.PdfName;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfString;
import com.lowagie.text.pdf.PdfWriter;
import jakarta.mail.util.ByteArrayDataSource;

import java.awt.*;
import java.io.ByteArrayOutputStream;

public class PdfUtil {

    public static final Font headFont = FontFactory.getFont(FontFactory.HELVETICA, 9, WebColors.getRGBColor("#FFFFFF"));
    public static final Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);
    public static final Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 10);
    public static final Font endBoldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
    public static final Font endNormalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
    public static final Font bold = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

    public static final Color GRIS = WebColors.getRGBColor("#4B4947");


    public static void generateSingleTabbedRow(PdfPTable table, String description, Integer quantity, Float price) {
        PdfPCell cell = new PdfPCell(new Phrase());
        cell.setColspan(1);
        cell.setBorder(0);
        addAlignCell(table, cell, Element.ALIGN_LEFT);
        generateRow(table, description, quantity, price, normalFont, 5);
    }

    public static void generateSingleBoldRow(PdfPTable table, String description, Integer quantity, Float price) {
        generateRow(table, description, quantity, price, boldFont, 6);
    }

    private static void generateRow(PdfPTable table, String description, Integer quantity, Float price, Font font, int colspan) {
        PdfPCell cell = new PdfPCell(new Phrase(description, font));
        cell.setColspan(colspan);
        cell.setBorder(0);
        addAlignCell(table, cell, Element.ALIGN_LEFT);

        cell = new PdfPCell(new Phrase("%d".formatted(quantity), normalFont));
        cell.setColspan(2);
        cell.setBorder(0);
        addAlignCell(table, cell, Element.ALIGN_CENTER);

        cell = new PdfPCell(new Phrase(String.format("%.2f€", price), normalFont));
        cell.setColspan(2);
        cell.setBorder(0);
        addAlignCell(table, cell, Element.ALIGN_CENTER);

        cell = new PdfPCell(new Phrase(String.format("%.2f€", price * quantity), normalFont));
        cell.setColspan(2);
        cell.setBorder(0);
        addAlignCell(table, cell, Element.ALIGN_CENTER);
    }

    public static ByteArrayDataSource generatePdfByteArrayDataSourceFromPdfPTable(PdfPTable table) {
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

    public static PdfPCell addInlineParagraph(String title, String field, Font titleFont, Font fieldFont) {
        PdfPCell cell = new PdfPCell();

        Paragraph p = new Paragraph();
        p.add(new Chunk(title, titleFont));
        p.add(new Chunk(field, fieldFont));
        p.setAlignment(Element.ALIGN_RIGHT);
        cell.addElement(p);
        cell.setBorder(0);

        return cell;
    }

    public static void addDivider(PdfPTable table) {
        PdfPCell separatorCell = new PdfPCell();
        separatorCell.setColspan(12);
        separatorCell.setBorder(0);
        separatorCell.setBorderWidthBottom(2);
        separatorCell.setBorderColor(GRIS);
        table.addCell(separatorCell);
    }

    public static void addThinDivider(PdfPTable table) {
        PdfPCell separatorCell = new PdfPCell();
        separatorCell.setColspan(12);
        separatorCell.setBorder(0);
        separatorCell.setBorderWidthBottom(1);
        separatorCell.setBorderColor(GRIS);
        table.addCell(separatorCell);
    }

    public static void addAlignCell(PdfPTable table, PdfPCell cell, int align) {
        cell.setFixedHeight(23);
        cell.setHorizontalAlignment(align);
        cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
        table.addCell(cell);
    }
}
