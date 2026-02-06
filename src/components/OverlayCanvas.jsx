import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Crosshair } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { renderAsync } from 'docx-preview';
import StripeTemplate from './StripeTemplate';
import RefundTemplate2 from './RefundTemplate2';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@5.4.296/build/pdf.worker.min.mjs`;

const OverlayCanvas = ({ config, data, formId }) => {
    const printRef = useRef(null);
    const [fieldPositions, setFieldPositions] = useState({});
    const [dragging, setDragging] = useState(null);
    const [devMode, setDevMode] = useState(false);
    const [pdfDimensions, setPdfDimensions] = useState({ width: 0, height: 0 });
    const [pdfError, setPdfError] = useState(null);

    // Reset positions when form changes
    useEffect(() => {
        setFieldPositions({});
        setPdfError(null);
    }, [formId]);

    const handleDownload = async () => {
        if (!printRef.current) return;

        try {
            const btn = document.getElementById('download-btn');
            if (btn) btn.innerText = 'High Quality Render...';

            const pages = printRef.current.querySelectorAll('.form-page');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            for (let i = 0; i < pages.length; i++) {
                if (i > 0) pdf.addPage();

                // High quality render settings
                const canvas = await html2canvas(pages[i], {
                    scale: 4, // High quality
                    useCORS: true,
                    backgroundColor: '#ffffff',
                    logging: false,
                    allowTaint: true,
                    scrollX: 0,
                    scrollY: 0,
                    windowWidth: pages[i].scrollWidth,
                    windowHeight: pages[i].scrollHeight,
                    onclone: (clonedDoc) => {
                        const textElements = clonedDoc.querySelectorAll('.overlay-text');
                        textElements.forEach(el => {
                            const currentTop = el.style.top;
                            if (currentTop && currentTop.includes('%')) {
                                const topVal = parseFloat(currentTop);
                                el.style.top = (topVal - 1) + '%';
                            }
                            el.style.transform = 'none';
                            el.style.webkitFontSmoothing = 'antialiased';
                        });
                    }
                });

                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'NONE');
            }

            pdf.save(`${formId}_Dispute_Form.pdf`);

            if (btn) btn.innerHTML = '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download PDF';

        } catch (err) {
            console.error("PDF Generation failed", err);
            alert("Failed to generate PDF. Check console.");
        }
    };

    const handleDownloadJPG = async () => {
        if (!printRef.current) return;

        try {
            const btn = document.getElementById('download-jpg-btn');
            if (btn) btn.innerText = 'Generating JPG...';

            // Capture the first page (Stripe is usually one page)
            const pages = printRef.current.querySelectorAll('.form-page');
            const pageToCapture = pages[0];

            const canvas = await html2canvas(pageToCapture, {
                scale: 3, // Balanced quality for JPG
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                allowTaint: true,
                scrollX: 0,
                scrollY: 0,
                // For Stripe, we want the exact element size
                width: pageToCapture.offsetWidth,
                height: pageToCapture.offsetHeight
            });

            const link = document.createElement('a');
            link.download = `${formId}_Refund_Receipt.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.9);
            link.click();

            if (btn) btn.innerHTML = '<svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download JPG';

        } catch (err) {
            console.error("JPG Generation failed", err);
            alert("Failed to generate JPG. Check console.");
        }
    };

    const handleMouseDown = (e, fieldId, initialTop, initialLeft) => {
        if (devMode) return; // Disable drag in dev mode
        e.preventDefault();
        const startX = e.clientX;
        const startY = e.clientY;

        const currentPos = fieldPositions[fieldId] || { top: initialTop, left: initialLeft };
        const parentRect = e.target.offsetParent.getBoundingClientRect();

        const handleMouseMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;

            const dxPercent = (dx / parentRect.width) * 100;
            const dyPercent = (dy / parentRect.height) * 100;

            const startTopVal = parseFloat(currentPos.top);
            const startLeftVal = parseFloat(currentPos.left);

            const newTop = `${startTopVal + dyPercent}%`;
            const newLeft = `${startLeftVal + dxPercent}%`;

            setFieldPositions(prev => ({
                ...prev,
                [fieldId]: { top: newTop, left: newLeft }
            }));
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            setDragging(null);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        setDragging(fieldId);
    };

    const handleImageClick = (e) => {
        if (!devMode) return;
        const rect = e.currentTarget.getBoundingClientRect(); // Use currentTarget to get the page container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = ((x / rect.width) * 100).toFixed(1);
        const yPercent = ((y / rect.height) * 100).toFixed(1);
        alert(`Coordinates:\ntop: '${yPercent}%',\nleft: '${xPercent}%'`);
    };

    const pages = config.pages && config.pages.length > 0
        ? config.pages
        : (config.image ? [config.image] : []);

    const formatValue = (value, dateFormat) => {
        if (!value) return '';
        const date = new Date(value);
        if (isNaN(date.getTime())) return value;

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());
        const shortYear = year.slice(-2);

        if (dateFormat === 'DDMMYY') return `${day}${month}${shortYear}`;
        if (dateFormat === 'DDMMYYYY') return `${day}${month}${year}`;
        if (dateFormat === 'DD/MM/YYYY') return `${day}/${month}/${year}`;
        if (dateFormat === 'DD/MM/YY') return `${day}/${month}/${shortYear}`;

        return value;
    };

    const renderField = (fieldId, value, defaultStyle) => {
        const position = fieldPositions[fieldId] || defaultStyle;
        const isDragging = dragging === fieldId;

        const formattedValue = formatValue(value, defaultStyle.dateFormat);

        const renderContent = () => {
            const content = formattedValue || '';
            const prefix = defaultStyle.prefix ? (
                <span style={{
                    position: 'absolute',
                    whiteSpace: 'nowrap',
                    ...defaultStyle.prefixStyle,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    {defaultStyle.prefix.endsWith('.png') || defaultStyle.prefix.endsWith('.jpg') ? (
                        <img src={defaultStyle.prefix} alt="" style={defaultStyle.prefixImageStyle || { height: '1em' }} />
                    ) : defaultStyle.prefix}
                </span>
            ) : null;

            if (defaultStyle.gaps) {
                const chars = content.toString().split('');
                return (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {prefix}
                        {chars.map((char, i) => {
                            const isMasked = defaultStyle.maskedIndices?.includes(i);
                            const needsGap = defaultStyle.gaps.includes(i);
                            return (
                                <span
                                    key={i}
                                    style={{
                                        marginRight: `${parseFloat(defaultStyle.letterSpacing) || 0}px`,
                                        marginLeft: needsGap ? `${defaultStyle.gapSize || 10}px` : '0',
                                        display: 'inline-block',
                                        visibility: isMasked ? 'hidden' : 'visible'
                                    }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </div>
                );
            }

            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {prefix}
                    {defaultStyle.isHtml ? (
                        <span
                            style={{ marginLeft: defaultStyle.valueMarginLeft || '0' }}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <span style={{ marginLeft: defaultStyle.valueMarginLeft || '0' }}>
                            {content}
                        </span>
                    )}
                </div>
            );
        };

        return (
            <div
                onMouseDown={(e) => handleMouseDown(e, fieldId, defaultStyle.top, defaultStyle.left)}
                className={`overlay-text absolute ${devMode ? '' : 'cursor-move hover:bg-blue-500/10'} border border-transparent ${!devMode && 'hover:border-blue-300'} rounded px-1 transition-colors ${isDragging ? 'z-50 ring-2 ring-blue-500' : ''}`}
                style={{
                    ...defaultStyle,
                    ...position,
                    userSelect: 'none',
                    backgroundColor: 'transparent',
                    fontFamily: defaultStyle.fontFamily || '"Courier New", Courier, monospace',
                    fontWeight: 600,
                    lineHeight: '1',
                    padding: '0',
                    color: '#000000',
                    // Override those that are handled inside renderContent
                    letterSpacing: (defaultStyle.isCardNo || defaultStyle.prefix) ? '0' : (defaultStyle.letterSpacing || 'normal'),
                }}
                title={devMode ? "See coordinates" : "Drag to align"}
            >
                {renderContent()}
            </div>
        );
    };

    const renderTransactions = (pageIndex) => {
        if (pageIndex !== 0 || !config.fields?.transactionsStart) return null;

        return data.transactions.map((tx, index) => {
            const startTop = parseFloat(config.fields.transactionsStart.top);
            const rowHeight = parseFloat(config.fields.rowHeight || 4.5);
            const baseTop = `${startTop + (index * rowHeight)}%`;

            return (
                <React.Fragment key={index}>
                    {Object.entries(config.fields.columns).map(([colKey, colConfig]) => {
                        const fieldId = `tx_${index}_${colKey}`;
                        // Map tx data based on colKey (date, merchant, amount, etc.)
                        const value = tx[colKey] || '';

                        return renderField(fieldId, value, {
                            top: baseTop,
                            left: colConfig.left,
                            fontSize: config.fields.fontSize || '13px',
                            width: colConfig.width,
                            ...colConfig // Allow overriding font, etc.
                        });
                    })}
                </React.Fragment>
            );
        });
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full">
            {/* Action Bar */}
            <div className="flex justify-between items-center w-full sticky top-0 z-50 px-4 py-2 bg-white/80 backdrop-blur shadow-sm rounded-lg">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setDevMode(!devMode)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${devMode ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                    >
                        <Crosshair className="w-4 h-4" />
                        <span className="text-sm">
                            {devMode ? 'Dev Mode ON (Click Image)' : 'Enable Calibration'}
                        </span>
                    </button>

                    {!devMode && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                            Interactive Mode: Drag text to align
                        </div>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        id="download-jpg-btn"
                        onClick={handleDownloadJPG}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" /> Download JPG
                    </button>

                    <button
                        id="download-btn"
                        onClick={handleDownload}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" /> Download PDF
                    </button>
                </div>
            </div>

            {/* Canvas Container */}
            <div ref={printRef} className="flex flex-col gap-8 pb-20">
                {pages.map((pageSrc, idx) => {
                    const isPdf = pageSrc && pageSrc.toLowerCase().endsWith('.pdf');
                    const isDocx = pageSrc && pageSrc.toLowerCase().endsWith('.docx');
                    return (
                        <div
                            key={idx}
                            className={`form-page relative shadow-2xl transition-transform overflow-hidden ${(!isPdf && !isDocx) ? 'bg-white' : 'bg-gray-50'}`}
                            onClick={handleImageClick}
                            style={{
                                width: formId === 'STRIPE' ? '375px' : (formId === 'REFUND 2' ? '8.5in' : '210mm'),
                                height: formId === 'STRIPE' ? 'auto' : (formId === 'REFUND 2' ? 'auto' : '297mm'),
                                minHeight: formId === 'STRIPE' ? '720px' : (formId === 'REFUND 2' ? '11in' : '297mm'),
                                backgroundColor: '#ffffff',
                                // Support custom background style from config, otherwise fallback to default
                                ...((config.pagesConfig && config.pagesConfig[idx]?.style) || config.backgroundStyle || {
                                    backgroundImage: !isPdf && !isDocx ? `url('${pageSrc}')` : 'none',
                                    backgroundSize: '100% 100%',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                }),
                                cursor: devMode ? 'crosshair' : 'default',
                                isolation: 'isolate'
                            }}
                        >
                            {/* Background Image/PDF/DOCX */}
                            {!isPdf && !isDocx && pageSrc && (
                                <img
                                    src={pageSrc}
                                    className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none"
                                    alt="Background"
                                />
                            )}

                            {isPdf && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Document
                                        file={pageSrc}
                                        onLoadSuccess={() => {
                                            console.log('PDF Loaded Successfully:', pageSrc);
                                            setPdfError(null);
                                        }}
                                        onLoadError={(error) => {
                                            console.error('Error loading PDF:', error);
                                            setPdfError(error.message);
                                        }}
                                        loading={<div className="flex items-center justify-center h-full text-blue-500 font-bold">Loading PDF...</div>}
                                        error={<div className="flex items-center justify-center h-full text-red-500 font-bold p-4">Error: {pdfError || "Failed to load PDF"}</div>}
                                    >
                                        <Page
                                            pageNumber={1}
                                            width={1588} // Render at 2x resolution (1588px) for sharpness
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                            className="w-full h-full"
                                            canvasClassName="w-full h-full" // Force stretch to match container exactly
                                        />
                                    </Document>
                                </div>
                            )}

                            {isDocx && (
                                <DocxRenderer src={pageSrc} />
                            )}

                            {!pageSrc && formId !== 'STRIPE' && formId !== 'REFUND 2' && (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 m-8 rounded bg-gray-50">
                                    {formId} Page {idx + 1} Image Not Found
                                </div>
                            )}

                            {formId === 'STRIPE' && (
                                <StripeTemplate data={data} />
                            )}

                            {formId === 'REFUND 2' && (
                                <RefundTemplate2 data={data} />
                            )}

                            {/* Render fields designated for this page - Skip for STRIPE and REFUND 2 as they have their own HTML rendering */}
                            {config.fields && formId !== 'STRIPE' && formId !== 'REFUND 2' && (
                                <div className="absolute inset-0 w-full h-full pointer-events-none">
                                    {Object.entries(config.fields).map(([key, fieldConfig]) => {
                                        // Skip table-related keys
                                        if (['transactionsStart', 'rowHeight', 'columns', 'footer', 'fontSize', 'fontFamily'].includes(key)) return null;

                                        // Render only if field is for this page (default to page 0)
                                        const fieldPage = fieldConfig.page || 0;
                                        if (fieldPage !== idx) return null;

                                        return renderField(key, data[key], { ...fieldConfig });
                                    })}

                                    {/* Transactions (Default to Page 0) */}
                                    {idx === 0 && renderTransactions(idx)}

                                    {/* Footer (Nested fields like phone/date) */}
                                    {config.fields.footer && Object.entries(config.fields.footer).map(([subKey, subConfig]) => {
                                        const subPage = subConfig.page || 0;
                                        if (subPage !== idx) return null;
                                        return renderField(`footer_${subKey}`, data[subKey], { ...subConfig });
                                    })}
                                </div>
                            )}
                        </div>
                    )
                })}

                {pages.length === 0 && (
                    <div className="flex items-center justify-center text-gray-500 w-[210mm] h-[297mm] border-2 border-dashed border-gray-300 rounded bg-gray-50">
                        No form pages configured for {formId}
                    </div>
                )}
            </div>
        </div>
    );
};

// Sub-component for rendering DOCX
// Global cache for DOCX blobs to prevent re-fetching
const blobCache = {};

const DocxRenderer = React.memo(({ src }) => {
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(!blobCache[src]); // If cached, don't show loading initial state
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const loadDocx = async () => {
            if (!containerRef.current || !src) return;

            // If we have a cached blob, render it immediately and skip fetch
            if (blobCache[src]) {
                if (isMounted) setLoading(false);
                try {
                    containerRef.current.innerHTML = '';
                    await renderAsync(blobCache[src], containerRef.current, null, {
                        inWrapper: false,
                        ignoreWidth: false,
                        ignoreHeight: false,
                        experimental: true
                    });
                    if (isMounted) console.log('DOCX rendered from cache');
                } catch (err) {
                    console.error("Failed to render cached DOCX", err);
                }
                return;
            }

            if (isMounted) setLoading(true);
            if (isMounted) setError(null);

            try {
                console.log('Fetching DOCX:', src);
                const response = await fetch(src);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const blob = await response.blob();

                // Cache the blob
                blobCache[src] = blob;

                if (!isMounted) return;

                console.log('DOCX Blob fetched, rendering...');
                containerRef.current.innerHTML = '';

                await renderAsync(blob, containerRef.current, null, {
                    inWrapper: false,
                    ignoreWidth: false,
                    ignoreHeight: false,
                    experimental: true
                });

                if (isMounted) {
                    console.log('DOCX rendered successfully');
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Failed to load DOCX", err);
                    setError(err.message);
                    setLoading(false);
                }
            }
        };

        loadDocx();

        return () => {
            isMounted = false;
        };
    }, [src]);

    return (
        <>
            {loading && <div className="absolute inset-0 flex items-center justify-center text-blue-500 bg-white/50 z-20">Loading Word Document...</div>}
            {error && <div className="absolute inset-0 flex items-center justify-center text-red-500 bg-white/50 z-20">Error: {error}</div>}
            <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden" />
        </>
    );
});

export default OverlayCanvas;
