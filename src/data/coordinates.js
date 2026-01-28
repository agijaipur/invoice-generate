export const BANK_LAYOUTS = {
    HDFC: {
        pages: ['/forms/HDFC_D.jpg'],
        fields: {
            name: { top: '22.3%', left: '14%', fontSize: '18px', fontWeight: 'bold' },
            cardNo: { top: '27.5%', left: '6.5%', letterSpacing: '14.5px', fontSize: '16px', fontFamily: 'monospace' },
            transactionsStart: { top: '38.2%', left: '5%', fontWeight: 'bold', fontSize: '12px' },
            rowHeight: '2.1%',
            columns: {
                date: { left: '8%', width: '15%' },
                merchant: { left: '27%', width: '40%' },
                amount: { left: '70%', width: '20%' }
            },
            footer: {
                phone: { top: '89%', left: '20%' },
                date: { top: '89%', left: '70%' }
            }
        }
    },
    // Initialize other banks with empty structure to be populated via Dev Mode
    ICICI: {
        pages: ['/forms/icici dispute.jpg'],
        fields: {
            name: { top: '82.5%', left: '10%', fontSize: '16px' }, // Empty line above table
            cardNo: { top: '16%', left: '14.5%', letterSpacing: '27.5px', fontSize: '18px', fontFamily: 'monospace' },
            transactionsStart: { top: '29.8%', left: '2%', fontSize: '12px' },
            rowHeight: '2%',
            columns: {
                date: { left: '6%', width: '15%' },
                merchant: { left: '30%', width: '25%' },
                amount: { left: '65%', width: '10%' },
                disputedAmount: { left: '84.8%', width: '10%' }
            },
            footer: {
                phone: { top: '85.2%', left: '12%' },
                date: { top: '87.5%', left: '10%' } // Date at the very top
            }
        }
    },
    AXIS: {
        pages: ['/forms/axis-80EmJR0R.jpg'],
        fields: {
            name: { top: '18.8%', left: '30.8%', letterSpacing: '9.2px', fontSize: '14px', fontFamily: 'monospace' },
            phone: {
                top: '20.7%',
                left: '39.8%', // Shifted left to fit +91 in STD boxes
                fontSize: '14px',
                fontFamily: 'monospace',
                letterSpacing: '9px'
            },
            email: { top: '22.7%', left: '31%', letterSpacing: '8.7px', fontSize: '14px', fontFamily: 'monospace' },
            cardNo: {
                top: '24.9%',
                left: '30.5%',
                fontSize: '14px',
                fontFamily: 'monospace',
                isCardNo: true,
                gaps: [4, 8, 12],
                gapSize: 13, // Space between 4-digit blocks
                letterSpacing: '10px' // Normal box spacing
            },
            transactionsStart: { top: '35.2%', left: '0%', fontSize: '12px' },
            rowHeight: '2%',
            columns: {
                sr: { left: '6.2%', width: '2%' },
                date: { left: '10.5%', width: '12%', letterSpacing: '8.5px', fontFamily: 'monospace', dateFormat: 'DDMMYY' },
                merchant: { left: '23.5%', width: '25%' },
                amount: { left: '52.5%', width: '12%' },
                disputedAmount: { left: '71.5%', width: '12%' }
            },
            footer: {

                date: { top: '92.5%', left: '9.5%', dateFormat: 'DDMMYYYY', letterSpacing: '8.5px' }
            }
        }
    },
    "YES BANK": {
        pages: ['/forms/Yes.jpg'],
        fields: {
            name: { top: '25%', left: '4%', letterSpacing: '18px', fontSize: '18px' },
            cardNo: {
                top: '32%',
                left: '3.3%',
                isCardNo: true,
                gaps: [6],
                gapSize: 1,
                letterSpacing: '19px',
                maskedIndices: [6, 7, 8, 9, 10, 11]
            },
            transactionsStart: { top: '52%', left: '0%', fontSize: '12px', letterSpacing: '7px' },
            rowHeight: '2.7%',
            columns: {
                date: { left: '10.5%', width: '20%', fontFamily: 'monospace', dateFormat: 'DD/MM/YY' },
                merchant: { left: '30%', width: '25%', },
                amount: { left: '52.5%', width: '12%' },
                disputedAmount: { left: '75%', width: '12%' }
            },
            footer: {
                phone: { top: '36%', left: '32.5%', letterSpacing: '20px' },
                date: { top: '13.5%', left: '73%', dateFormat: 'DDMMYYYY', letterSpacing: '14px' }
            }
        }
    },
    RBL: {
        pages: ['/forms/RBL/RBL_page 1.jpg', '/forms/RBL/RBL_page2.jpg'],
        fields: {
            name: { top: '13.8%', left: '46.5%', fontSize: '16px' },
            cardNo: { top: '16.7%', left: '46.5%', fontSize: '16px', maxLength: 4 },
            phone: { top: '19.8%', left: '46.5%', fontSize: '16px' },
            email: { top: '22.6%', left: '46.5%', fontSize: '16px' },
            transactionsStart: { top: '31%', left: '0%', fontSize: '12px' },
            rowHeight: '2%',
            columns: {
                transactionDate: { left: '4.5%', width: '12%', dateFormat: 'DD/MM/YYYY' },
                statementDate: { left: '17.5%', width: '12%', dateFormat: 'DD/MM/YYYY' },
                merchant: { left: '31.5%', width: '34%' },
                amount: { left: '67.5%', width: '15%' },
                disputedAmount: { left: '84.0%', width: '15%' }
            },
            footer: {
                date: { top: '7%', left: '78.5%', width: '15%', dateFormat: 'DD/MM/YYYY' }
            }
        }
    },
    IDFC: {
        pages: ['/forms/IDFC/IDFC_pg1-CNFFVvlb.jpg', '/forms/IDFC/IDFC_pg2.jpg'],
        fields: {
            date: { top: '14.4%', left: '73.1%', dateFormat: 'DDMMYYYY', letterSpacing: '5px', gaps: [2, 2, 4], gapSize: 10, fontSize: '13px' },
            cardNo: {
                top: '19.7%',
                left: '15.5%',
                fontSize: '13px',
                isCardNo: true,
                gaps: [4],
                gapSize: 1,
                letterSpacing: '7.5px',
                maskedIndices: [4, 5, 6, 7, 8, 9, 10, 11]
            },
            transactionsStart: { top: '30%', left: '0%', fontSize: '12px' },
            rowHeight: '3%',
            columns: {
                transactionDate: { left: '17%', width: '17%', dateFormat: 'DD/MM/YYYY' },
                merchant: { left: '33%', width: '36%' },
                amount: { left: '65%', width: '15%' },
                disputedAmount: { left: '78%', width: '14%' }
            },
            footer: {
                phone: { top: '39%', left: '74%', page: 1, letterSpacing: '8px', gapSize: 34, fontSize: '12px' },
            }
        }
    },
    INDUSIND: {
        pages: ['/forms/indus_pg1-Dr_C8UqZ.jpg'],
        fields: {
            cardNo: {
                top: '15.5%',
                left: '19.8%',
                letterSpacing: '7.8px',
                fontSize: '12.5px',
                fontFamily: 'monospace',
                // isCardNo: true,
                maxLength: 16
            },
            name: {
                top: '17.5%',
                left: '20%',
                fontSize: '12px',
                letterSpacing: '8px',
                fontFamily: 'monospace'
            },
            transactionsStart: { top: '22%', left: '0%', fontSize: '11px' },
            rowHeight: '2%',
            columns: {
                merchant: { left: '10%', width: '38%' },
                date: { left: '51%', width: '13%', dateFormat: 'DD/MM/YYYY' },
                amount: { left: '64.5%', width: '11%' },
                disputedAmount: { left: '78.5%', width: '18%' }
            },
            footer: {
                date: { top: '76.5%', left: '9%', width: '15%', dateFormat: 'DDMMYYYY', letterSpacing: '5.5px', }
            }
        }
    },
    KOTAK: {
        pages: ['/forms/Kotak/kotak-pg1-BTvC0yUb.jpg', '/forms/Kotak/kotak-pg2-.jpg'],
        fields: {
            cardNo: {
                top: '18.4%',
                left: '15.2%',
                letterSpacing: '8px',
                fontSize: '12px',
                fontFamily: 'monospace',

            },
            name: {
                top: '26.5%',
                left: '5.2%', // Skipping the first "Title" box
                fontSize: '12px',
                letterSpacing: '6px',
                fontFamily: ''
            },
            transactionsStart: { top: '38.2%', left: '5%', fontSize: '11px' },
            rowHeight: '2%',
            columns: {
                date: { left: '14.5%', width: '13%', dateFormat: 'DD/MM/YYYY' },
                merchant: { left: '30%', width: '18%' },
                atmId: { left: '55.5%', width: '12%' },
                amount: { left: '69.8%', width: '10%' },
                disputeAmount: { left: '82%', width: '8%' }
            },
            footer: {
                phone: { top: '52.2%', left: '12.8%', page: 1, letterSpacing: '6px', fontSize: '12px', },
                date: { top: '79%', left: '80.2%', page: 1, dateFormat: 'DDMMYYYY', letterSpacing: '10px', fontSize: '12px', }
            }
        }
    },

    // Refunds
    STRIPE: {
        pages: [''], // HTML based template, no image needed
        image: '/forms/invoice.jpg',
        isHtml: true,
        fields: {
            project: { defaultValue: 'Procandi' },
            price: { defaultValue: '1,050.00' },
            currency: { defaultValue: '£' },
            cardLast4: { defaultValue: '0000' },
            email: { defaultValue: 'admin@procandi.com' },
            refundDate: { defaultValue: 'Mar 3, 2024, 10:15:22 AM' },
            transactionDate: { defaultValue: 'Apr 2, 2024' },
            invoiceLast4: { defaultValue: '1232' }
        }
    },
    "REFUND 2": { pages: ['/forms/refund2.png'], fields: {} },
    "TBL REFUND GMAIL": { pages: ['/forms/tbl_gmail.png'], fields: {} },

    // Gmail Formats
    "GMAIL COMMUNICATION": { pages: ['/forms/gmail_comm.png'], fields: {} },
    "AMAZON AE": { pages: ['/forms/amazon_ae.png'], fields: {} },
    "AMAZON DE": { pages: ['/forms/amazon_de.png'], fields: {} },
    "AMAZON UK": { pages: ['/forms/amazon_uk.png'], fields: {} },
    "AMAZON CA": { pages: ['/forms/amazon_ca.png'], fields: {} },
    "AMAZON ES": { pages: ['/forms/amazon_es.png'], fields: {} },
};

// Backwards compatibility alias
export const COORDINATES = BANK_LAYOUTS;
