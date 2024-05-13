package ps.backend.service;

import com.lowagie.text.Element;
import com.lowagie.text.Image;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import jakarta.mail.util.ByteArrayDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import ps.backend.entity.configurableVehicle.ConfigurableVehicle;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleColor;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleEngine;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleExtra;
import ps.backend.entity.configurableVehicle.ConfigurableVehicleRim;
import ps.backend.entity.userVehicle.UserConfiguration;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import static ps.backend.util.PdfUtil.GRIS;
import static ps.backend.util.PdfUtil.addAlignCell;
import static ps.backend.util.PdfUtil.addDivider;
import static ps.backend.util.PdfUtil.addInlineParagraph;
import static ps.backend.util.PdfUtil.bold;
import static ps.backend.util.PdfUtil.boldFont;
import static ps.backend.util.PdfUtil.endBoldFont;
import static ps.backend.util.PdfUtil.endNormalFont;
import static ps.backend.util.PdfUtil.generatePdfByteArrayDataSourceFromPdfPTable;
import static ps.backend.util.PdfUtil.generateSingleBoldRow;
import static ps.backend.util.PdfUtil.generateSingleTabbedRow;
import static ps.backend.util.PdfUtil.headFont;
import static ps.backend.util.PdfUtil.normalFont;

@Service
public class PdfService {

    private static final Logger log = LoggerFactory.getLogger(PdfService.class);
    private static final String LOGO_IMG = "img/LOGO.png";

    public PdfService() {
    }

    public ByteArrayDataSource generateInvoicePDF(UserConfiguration userConfiguration, String orderNumber) {
        PdfPTable pdfPTable = new PdfPTable(12);

        this.createInvoiceHeader(pdfPTable, orderNumber);
        this.createInvoiceBody(pdfPTable, userConfiguration);

        ByteArrayDataSource dataSource = generatePdfByteArrayDataSourceFromPdfPTable(pdfPTable);
        dataSource.setName(
                "Factura_Concesionario_ULPGC.pdf"
        );

        return dataSource;
    }

    private void createInvoiceHeader(PdfPTable table, String orderNumber) {
        table.setWidthPercentage(100);
        PdfPCell cell;
        try {
            Image img = Image.getInstance(new ClassPathResource(LOGO_IMG).getURL());
            cell = new PdfPCell(img, true);
            cell.setColspan(5);
            cell.setRowspan(3);
            cell.setBackgroundColor(GRIS);
            cell.setBorder(0);
            addAlignCell(table, cell, Element.ALIGN_CENTER);

            String[] titles = {"Correo Electrónico: ", "Dirección: ", "Teléfono: "};
            String[] fields = {"ulpgc.concesionario@gmail.com", "Campus de Tafira, 35017 Las Palmas de Gran Canaria", "(+34) 928 xxx 105"};
            for (int i = 0; i < titles.length; i++) {
                cell = addInlineParagraph(titles[i], fields[i], headFont, headFont);
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

            cell = addInlineParagraph("Factura: ", orderNumber, boldFont, normalFont);
            cell.setColspan(12);
            cell.setVerticalAlignment(Element.ALIGN_BASELINE);
            table.addCell(cell);

            cell = addInlineParagraph("Fecha: ", String.valueOf(new Date()), boldFont, normalFont);
            cell.setColspan(12);
            cell.setVerticalAlignment(Element.ALIGN_TOP);
            cell.setPaddingBottom(10);
            table.addCell(cell);

            addDivider(table);

            cell = new PdfPCell(new Paragraph("Descripción", bold));
            cell.setColspan(6);
            cell.setBorder(0);
            addAlignCell(table, cell, Element.ALIGN_LEFT);

            cell = new PdfPCell(new Paragraph("Cantidad", bold));
            cell.setColspan(2);
            cell.setBorder(0);
            addAlignCell(table, cell, Element.ALIGN_CENTER);

            cell = new PdfPCell(new Paragraph("Precio Unitario", bold));
            cell.setColspan(2);
            cell.setBorder(0);
            addAlignCell(table, cell, Element.ALIGN_CENTER);

            cell = new PdfPCell(new Paragraph("Importe", bold));
            cell.setColspan(2);
            cell.setBorder(0);
            addAlignCell(table, cell, Element.ALIGN_CENTER);

            addDivider(table);
        } catch (IOException e) {
            log.error("Error creating header for pdf {}", e.getMessage());
        }
    }

    private void createInvoiceBody(PdfPTable table, UserConfiguration userConfiguration) {

        ConfigurableVehicle selectedVehicle = userConfiguration.getSelectedVehicle();
        String vehicleName = String.format("%s %s", selectedVehicle.getBrand(), selectedVehicle.getModel());
        generateSingleBoldRow(table, vehicleName, 1, selectedVehicle.getBasePrice());

        ConfigurableVehicleColor color = userConfiguration.getSelectedColor();
        String colorName = String.format("Color %s", color.getName());
        generateSingleTabbedRow(table, colorName, 1, color.getPrice());

        ConfigurableVehicleEngine engine = userConfiguration.getSelectedEngine();
        String engineName = String.format("Motor %s", color.getName());
        generateSingleTabbedRow(table, engineName, 1, engine.getPrice());

        ConfigurableVehicleRim rim = userConfiguration.getSelectedRim();
        String rimName = String.format("Llantas %s", color.getName());
        generateSingleTabbedRow(table, rimName, 1, rim.getPrice());

        List<ConfigurableVehicleExtra> extras = userConfiguration.getSelectedExtras();
        extras.forEach(extra -> generateSingleTabbedRow(table, extra.getName(), 1, extra.getPrice()));


        this.generateInvoiceEnd(table, userConfiguration.getTotalPrice());
    }

    private void generateInvoiceEnd(PdfPTable table, float totalPrice) {
        addDivider(table);

        PdfPCell cell = addInlineParagraph("IMPORTE TOTAL: ", String.format("%.2f€", totalPrice), endBoldFont, endNormalFont);

        cell.setColspan(12);
        cell.setPaddingRight(20);
        addAlignCell(table, cell, 2);

    }
}
