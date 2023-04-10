import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./style.css";

import pdfFile from "./articles/example.pdf";

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFViewer() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess(success) {
    const nextNumPages = success.numPages;
    setNumPages(nextNumPages);
  }

  return (
    <div className="pdf-viewer">
      <div className="page">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
        >
          {Array.from(new Array(numPages), (el, index) => {
            return <Page key={`page_${index + 1}`} pageNumber={index + 1} />;
          })}
        </Document>
      </div>
    </div>
  );
}
