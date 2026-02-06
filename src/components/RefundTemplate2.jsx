import React from 'react';

const RefundTemplate2 = ({ data }) => {
    // Extract data with fallbacks
    const {
        invoiceNumber = '393F4753-0001',
        receiptNumber = '3770-8198',
        dateIssued = 'October 27, 2024',
        paymentMethod = 'Mastercard - 9680',
        companyName = 'coursechamps',
        companyAddress1 = '1309 Coffeen Avenue',
        companyAddress2 = 'STE 1200',
        companyAddress3 = 'Sheridan, Wyoming 82801',
        companyAddress4 = 'United States',
        companyPhone = '+1 929-342-4519',
        billToName = 'Joy Ghosh',
        billToEmail = 'joyghosh20246@gmail.com',
        refundAmount = '$999.99',
        refundDate = 'October 27, 2024',
        itemDescription = 'SMMA Incubator Course',
        itemQty = '1',
        itemUnitPrice = '$999.99',
        itemAmount = '$999.99',
        subtotal = '$999.99',
        total = '$999.99',
        amountPaid = '$999.99',
        refundedAmount = '$999.99',
        totalRefundedWithoutCredit = '$999.99'
    } = data;

    const styles = {
        wrapper: {
            boxSizing: 'border-box',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            background: '#ffffff',
            margin: 0,
            padding: '32px 32px',
            color: '#2d3748',
            width: '8.5in',
            minHeight: '11in',
            fontSize: '14px',
            lineHeight: '1.5'
        },
        header: {
            marginBottom: '28px'
        },
        title: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '30px',
            // letterSpacing: '-0.5px'
        },
        infoGrid: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            marginBottom: '48px'
        },
        infoRow: {
            display: 'grid',
            fontSize: '20px',
            gridTemplateColumns: '150px 1fr',
            gap: '2px',
            alignItems: 'baseline'
        },
        label: {
            fontSize: '16px',
            color: '#2d3748',
            fontWeight: '600',
            lineHeight: '1.5'
        },
        value: {
            fontSize: '16px',
            color: '#2d3748',
            fontWeight: '600',
            lineHeight: '1.5'
        },
        addressSection: {
            display: 'grid',
            gridTemplateColumns: 'max-content max-content',
            gap: '100px',
            fontSize: '16px',
            marginBottom: '56px'
        },
        addressBlock: {
            fontSize: '16px',
            lineHeight: '1'
        },
        addressTitle: {
            fontSize: '16px',
            color: '#2d3748',
            fontWeight: '600',
            marginBottom: '8px'
        },
        addressLine: {
            fontSize: '16px',
            color: '#4a5568',
            fontWeight: '400',
            margin: '0',
            lineHeight: '1.4'
        },
        refundStatement: {
            fontSize: '20px',
            fontWeight: '500',
            color: '#2d3748',
            marginBottom: '20px',
            letterSpacing: '-0.3px'
        },
        itemTitle: {
            fontSize: '16px',
            fontWeight: '400',
            color: '#2d3748',
            marginBottom: '16px'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '28px'
        },
        tableHeader: {
            borderBottom: '2px solid #cbd5e0',
            paddingBottom: '10px',
            fontSize: '12px',
            textAlign: 'left'
        },
        tableHeaderCell: {
            fontSize: '11px',
            color: '#718096',
            fontWeight: '400',
            textTransform: 'uppercase',
            padding: '10px 8px 10px 0',
            letterSpacing: '0.5px'
        },
        tableRow: {
            borderBottom: '1px solid #edf2f7'
        },
        tableCell: {
            fontSize: '12px',
            color: '#2d3748',
            padding: '14px 8px 14px 0',
            fontWeight: '600'
        },
        summarySection: {
            marginTop: '32px',
            paddingTop: '0',
            width: '45%',
            marginLeft: 'auto',
            borderTop: '1px solid #e2e8f0'
        },
        summaryRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 0',
            fontSize: '14px',
            borderBottom: '1px solid #e2e8f0'
        },
        summaryLabel: {
            color: '#4a5568',
            fontWeight: '400'
        },
        summaryValue: {
            color: '#2d3748',
            fontWeight: '400',
            textAlign: 'right',
            minWidth: '110px'
        },
        footer: {
            marginTop: '72px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0'
        },
        footerTitle: {
            fontSize: '12px',
            fontWeight: '400',
            color: '#4a5568',
            marginBottom: '9px'
        },
        footerText: {
            fontSize: '12px',
            color: '#4a5568',
            lineHeight: '1',
            marginBottom: '24px'
        },
        footerDetails: {
            fontSize: '12px',
            color: '#4a5568',
            lineHeight: '1',
            marginTop: '20px'
        }
    };

    return (
        <div style={styles.wrapper}>
            {/* Header */}
            <div style={styles.header}>
                <h1 style={styles.title}>Refund</h1>

                <div style={styles.infoGrid}>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>Invoice number</span>
                        <span style={styles.value}>{invoiceNumber}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>Receipt number</span>
                        <span style={styles.value}>{receiptNumber}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>Date issued</span>
                        <span style={styles.value}>{dateIssued}</span>
                    </div>
                    <div style={styles.infoRow}>
                        <span style={styles.label}>Payment method</span>
                        <span style={styles.value}>{paymentMethod}</span>
                    </div>
                </div>
            </div>

            {/* Address Section */}
            <div style={styles.addressSection}>
                <div style={styles.addressBlock}>
                    <div style={styles.addressTitle}>{companyName}</div>
                    <div style={styles.addressLine}>{companyAddress1}</div>
                    <div style={styles.addressLine}>{companyAddress2}</div>
                    <div style={styles.addressLine}>{companyAddress3}</div>
                    <div style={styles.addressLine}>{companyAddress4}</div>
                    <div style={styles.addressLine}>{companyPhone}</div>
                </div>
                <div style={styles.addressBlock}>
                    <div style={styles.addressTitle}>Bill to</div>
                    <div style={styles.addressLine}>{billToName}</div>
                    <div style={styles.addressLine}>{billToEmail}</div>
                </div>
            </div>

            {/* Refund Statement */}
            <div style={styles.refundStatement}>
                {refundAmount} refunded on {refundDate}
            </div>

            {/* Item Description */}
            <div style={styles.itemTitle}>{itemDescription}</div>

            {/* Table */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.tableHeader}>
                        <th style={{ ...styles.tableHeaderCell, textAlign: 'left' }}>Description</th>
                        <th style={{ ...styles.tableHeaderCell, textAlign: 'right', paddingRight: '0' }}>QTY</th>
                        <th style={{ ...styles.tableHeaderCell, textAlign: 'right', paddingRight: '0' }}>Unit Price</th>
                        <th style={{ ...styles.tableHeaderCell, textAlign: 'right', paddingRight: '0' }}>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={styles.tableRow}>
                        <td style={{ ...styles.tableCell, textAlign: 'left' }}>{itemDescription}</td>
                        <td style={{ ...styles.tableCell, textAlign: 'right', paddingRight: '0' }}>{itemQty}</td>
                        <td style={{ ...styles.tableCell, textAlign: 'right', paddingRight: '0' }}>{itemUnitPrice}</td>
                        <td style={{ ...styles.tableCell, textAlign: 'right', paddingRight: '0' }}>{itemAmount}</td>
                    </tr>
                </tbody>
            </table>

            {/* Summary Section */}
            <div style={styles.summarySection}>
                <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Subtotal</span>
                    <span style={styles.summaryValue}>{subtotal}</span>
                </div>
                <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Total</span>
                    <span style={styles.summaryValue}>{total}</span>
                </div>
                <div style={styles.summaryRow}>
                    <span style={{ ...styles.summaryLabel, fontWeight: '600' }}>Amount paid</span>
                    <span style={{ ...styles.summaryValue, fontWeight: '600' }}>{amountPaid}</span>
                </div>
                <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Refunded on {refundDate}</span>
                    <span style={styles.summaryValue}>{refundedAmount}</span>
                </div>
                <div style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>Total refunded without credit note</span>
                    <span style={styles.summaryValue}>{totalRefundedWithoutCredit}</span>
                </div>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <div style={styles.footerTitle}>Refund instructions</div>
                <div style={styles.footerText}>
                    Your refund has been issued by {companyName}. It may take about 5 to 10 days to appear on your statement, if it takes longer please contact your bank for assistance.
                </div>
                <div style={styles.footerDetails}>
                    {receiptNumber} · {refundAmount} refunded on {refundDate}
                </div>
            </div>
        </div>
    );
};

export default RefundTemplate2;
