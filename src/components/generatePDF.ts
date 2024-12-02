import { ResumeData } from '@/types';
import jsPDF from 'jspdf';

export const generatePDF = (data: ResumeData) => {
    const doc = new jsPDF();
    let yPos = 15;
    const leftMargin = 15;
    const pageWidth = 210;
    const lineHeight = 5;
    const sectionSpacing = 5;
    const headingPadding = 1;


    // Helper functions
    const centerText = (text: string) => {
        const textWidth = doc.getTextWidth(text);
        return (pageWidth - textWidth) / 2;
    };

    const addHeading = (text: string) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text(text, leftMargin, yPos);
        yPos += headingPadding;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.line(leftMargin, yPos, pageWidth - leftMargin, yPos);
        yPos += sectionSpacing;
    };

    const addSection = (text: string, subtext?: string) => {
        doc.setFont('helvetica', 'bold');
        doc.text(text, leftMargin, yPos);
        if (subtext) {
            doc.setFont('helvetica', 'normal');
            doc.text(subtext, pageWidth - leftMargin - doc.getTextWidth(subtext), yPos);
        }
        yPos += lineHeight;
    };

    const addText = (text: string) => {
        const lines = doc.splitTextToSize(text, pageWidth - 2 * leftMargin);
        doc.setFont('helvetica', 'normal');
        doc.text(lines, leftMargin, yPos);
        yPos += lineHeight * lines.length;
    };

    // Personal Information (Centered)
    const { personalInformation: pi } = data;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(pi.fullName, centerText(pi.fullName), yPos);
    yPos += lineHeight;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(pi.title, centerText(pi.title), yPos);
    yPos += lineHeight;

    const contactInfo = `${pi.email} | ${pi.phone} | ${pi.location}`;
    doc.text(contactInfo, centerText(contactInfo), yPos);
    yPos += lineHeight;

    if (pi.linkedin || pi.github || pi.website) {
        doc.setTextColor(0, 102, 204);
        const links = `${pi.linkedin} | ${pi.github} ${pi.website ? '| ' + pi.website : ''}`;
        pi.linkedin && doc.textWithLink(pi.linkedin, centerText(links), yPos, { url: pi.linkedin });
        pi.github && doc.textWithLink(pi.github, centerText(links) + doc.getTextWidth(pi.linkedin) + 3, yPos, { url: pi.github });
        pi.website && doc.textWithLink(pi.website, centerText(links) + doc.getTextWidth(pi.linkedin) + doc.getTextWidth(pi.github) + 6, yPos, { url: pi.website });
        doc.setTextColor(0, 0, 0);
        yPos += lineHeight;
    }

    // Summary
    if (pi.summary) {
        addHeading('SUMMARY');
        addText(pi.summary);
        yPos += lineHeight/2;
    }

    // Experience
    if (data.experiences.length > 0) {
        addHeading('EXPERIENCE');
        data.experiences.forEach(exp => {
            addSection(exp.title, `${exp.startDate.split('-').reverse().join('/').substring(3, 10)} - ${exp.endDate.split('-').reverse().join('/').substring(3, 10)}`);
            addSection(exp.company);
            addText(exp.description);
            yPos += lineHeight / 2;
        });
    }

    // Education
    if (data.education.length > 0) {
        addHeading('EDUCATION');
        data.education.forEach(edu => {
            addSection(edu.school, `${edu.startDate} - ${edu.endDate}`);
            addText(`${edu.degree}${edu.grade ? ' - ' + edu.grade : ''}`);
            yPos += lineHeight / 2;
        });
    }

    // Skills in two columns
    if (data.skills.length > 0) {
        addHeading('SKILLS');
        const skills = data.skills.map(skill => skill.name);
        const midPoint = Math.ceil(skills.length / 2);
        const column1 = skills.slice(0, midPoint);
        const column2 = skills.slice(midPoint);

        const columnWidth = (pageWidth - 2 * leftMargin) / 2;
        const startY = yPos;

        // First column
        column1.forEach(skill => {
            doc.text(skill, leftMargin, yPos);
            yPos += lineHeight;
        });

        // Second column
        yPos = startY;
        column2.forEach(skill => {
            doc.text(skill, leftMargin + columnWidth, yPos);
            yPos += lineHeight;
        });

        yPos = Math.max(yPos, startY + column1.length * lineHeight) + lineHeight / 2;
    }

    // Projects
    if (data.projects.length > 0) {
        addHeading('PROJECTS');
        data.projects.forEach(project => {
            addSection(project.name + ' | ' + project.technologies);
            doc.setTextColor(0, 102, 204);
            doc.setFont('helvetica', 'normal');
            if (project.link) doc.textWithLink(project.link, leftMargin, yPos, { url: project.link });
            doc.setTextColor(0, 0, 0);
            yPos += lineHeight;
            addText(project.description);
            yPos += lineHeight / 2;
        });
    }

    // Certifications
    if (data.certifications.length > 0) {
        addHeading('CERTIFICATIONS');
        data.certifications.forEach(cert => {
            addText(cert.name + (cert.issuer ? ' | ' + cert.issuer : ''));
            yPos += lineHeight / 2;
        });
    }

    // Languages
    if (data.languages.length > 0) {
        addHeading('LANGUAGES');
        const languages = data.languages;
        const midPoint = Math.ceil(languages.length / 2);
        const column1 = languages.slice(0, midPoint);
        const column2 = languages.slice(midPoint);

        const columnWidth = (pageWidth - 2 * leftMargin) / 2;
        const startY = yPos;

        // First column
        column1.forEach(language => {
            doc.text(language.name + ' - ' + language.proficiency, leftMargin, yPos);
            yPos += lineHeight;
        });

        // Second column
        yPos = startY;
        column2.forEach(language => {
            doc.text(language.name + ' - ' + language.proficiency, leftMargin + columnWidth, yPos);
            yPos += lineHeight;
        });

        yPos = Math.max(yPos, startY + column1.length * lineHeight) + lineHeight / 2;
    }

    return doc;
};