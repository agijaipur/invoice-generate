import React from 'react';

const TBLRefundGmail = ({ data = {} }) => {
    const {
        companyName = 'XXXX',
        companyId = 'XXXX',
        orderNumber = 'XXXX',
        purchasedDate = 'XXXX',
        issuedDate = 'XXXX',
        referenceNumber = 'XXXX',
        paymentMethod = 'XXXX - *XXXX',
        subtotal = 'XXXX',
        total = 'XXXX',
        amountRefunded = 'XXXX',
        adjustedTax = '£0',
        adjustedTotal = '£0',
        providerName = 'Procandi Limited - Coaching for Entrepreneurs',
        providerUrl = 'Procandi.co.uk',
        supplierName = 'Teachable',
        supplierAddressLine1 = '470 Park Ave South',
        supplierAddressLine2 = 'Sixth Floor',
        supplierAddressLine3 = 'New York, NY 10016 US',
        supplierTaxId = '100500265200003'
    } = data;

    const styles = {
        container: {
            width: '100%',
            minHeight: '11in',
            backgroundColor: '#ffffff',
            padding: '48px 64px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: '#111111',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto',
            fontSize: '13px',
            lineHeight: '1.5'
        },
        logoContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px'
        },
        logoImage: {
            width: '45px',
            height: 'auto'
        },
        headerTitle: {
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '30px',
            marginTop: '0'
        },
        hr: {
            height: '1px',
            backgroundColor: '#e6e6e6',
            border: 'none',
            margin: '15px 0'
        },
        section: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px'
        },
        sectionHalf: {
            flex: '1'
        },
        sectionHeader: {
            fontWeight: 'bold',
            marginBottom: '5px',
            marginTop: '0'
        },
        text: {
            margin: '2px 0',
        },
        linkColor: {
            color: '#13a8c7',
            textDecoration: 'underline'
        },
        bold: {
            fontWeight: 'bold'
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            alignItems: 'center'
        },
        totalRowTight: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '4px 0',
            alignItems: 'center'
        },
        copyrights: {
            textAlign: 'center',
            color: '#888888',
            fontSize: '11px',
            marginTop: '4px'
        }
    };

    return (
        <div style={styles.container}>
            {/* Logo */}
            <div style={styles.logoContainer}>
                <img
                    src="/assets/tbl_refund_logo.png"
                    alt="Logo"
                    style={styles.logoImage}
                />
            </div>

            {/* Header Title */}
            <h1 style={styles.headerTitle}>{companyName}</h1>

            <hr style={styles.hr} />

            {/* Info Section 1: Contact Information & Billing Info */}
            <div style={styles.section}>
                <div style={styles.sectionHalf}>
                    <div style={styles.sectionHeader}>Contact Information</div>
                    <div style={styles.text}>{companyName}</div>
                    <div style={{ ...styles.text, ...styles.linkColor }}>{companyId}</div>
                </div>
                <div style={styles.sectionHalf}>
                    <div style={styles.sectionHeader}>Billing Info</div>
                    <div style={styles.text}>{companyName}</div>

                    <div style={{ marginTop: '15px' }}>
                        <div style={styles.sectionHeader}>Delivery Address</div>
                        <div style={styles.text}>{companyName}</div>
                    </div>
                </div>
            </div>

            <hr style={styles.hr} />

            {/* Info Section 2: Order Details & Payment Method */}
            <div style={styles.section}>
                <div style={styles.sectionHalf}>
                    <div style={{ ...styles.text, ...styles.bold }}>Order Number: {orderNumber}</div>
                    <div style={styles.text}>Purchased Date: {purchasedDate}</div>
                    <div style={styles.text}>Issued Date: {issuedDate}</div>
                    <div style={styles.text}>Reference number: {referenceNumber}</div>
                </div>
                <div style={styles.sectionHalf}>
                    <div style={styles.sectionHeader}>Payment Method</div>
                    <div style={styles.text}>{paymentMethod}</div>
                    <div style={styles.text}>{companyName}</div>
                </div>
            </div>

            <hr style={styles.hr} />

            {/* Summary Section */}
            <div style={{ width: '100%' }}>
                <div style={styles.totalRow}>
                    <div style={styles.bold}>{companyName} (ID: {companyId})</div>
                    <div>{subtotal}</div>
                </div>
                <div style={styles.totalRowTight}>
                    <div>Subtotal</div>
                    <div>{subtotal}</div>
                </div>
                <div style={styles.totalRowTight}>
                    <div>Total</div>
                    <div>{total}</div>
                </div>
                <div style={{ ...styles.totalRowTight, marginTop: '8px' }}>
                    <div>Amount Refunded</div>
                    <div>{amountRefunded}</div>
                </div>
                <div style={styles.totalRowTight}>
                    <div>Adjusted Tax (0.0%)</div>
                    <div>{adjustedTax}</div>
                </div>
                <div style={{ ...styles.totalRowTight, ...styles.bold, marginTop: '8px' }}>
                    <div>Adjusted Total (GBP)</div>
                    <div>{adjustedTotal}</div>
                </div>
            </div>

            <hr style={styles.hr} />

            {/* Footer Details: Provider & Supplier */}
            <div style={styles.section}>
                <div style={styles.sectionHalf}>
                    <div style={styles.sectionHeader}>Provider</div>
                    <div style={{ ...styles.text, ...styles.linkColor }}>{providerName}</div>
                    <div style={{ ...styles.text, ...styles.linkColor }}>{providerUrl}</div>
                </div>
                <div style={styles.sectionHalf}>
                    <div style={styles.sectionHeader}>Supplier</div>
                    <div style={{ ...styles.text, ...styles.linkColor }}>{supplierName}</div>
                    <div style={{ ...styles.text }}>
                        <span style={styles.linkColor}>{supplierAddressLine1}</span>, {supplierAddressLine2}
                    </div>
                    <div style={styles.text}>{supplierAddressLine3}</div>
                    <div style={styles.text}>Tax ID: {supplierTaxId}</div>
                </div>
            </div>

            <hr style={styles.hr} />

            {/* Copyrights */}
            <div style={{ marginTop: '20px' }}>
                <div style={styles.copyrights}>Not a Tax Invoice</div>
                <div style={styles.copyrights}>Questions about this payment? Contact {providerName}</div>
                <div style={styles.copyrights}>© {providerUrl}</div>
            </div>
        </div>
    );
};

export default TBLRefundGmail;
