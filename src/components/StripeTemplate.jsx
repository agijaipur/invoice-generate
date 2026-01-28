import React from 'react';

const StripeTemplate = ({ data }) => {
    // Extract data with fallbacks
    const {
        project = 'Procandi',
        price = '1,050.00',
        currency = '£',
        cardLast4 = '0000',
        email = 'admin@procandi.com',
        refundDate = 'Mar 3, 2024, 10:15:22 AM',
        transactionDate = 'Apr 2, 2024',
        invoiceLast4 = '1232'
    } = data;

    // Derived display values
    const receiptNo = `Receipt #3395-${invoiceLast4}`;
    const displayAmount = `${currency}${price}`;
    const displayRefundedTo = `**** ${cardLast4}`;
    const displayAdjustedTotal = `${currency}0.00`;

    // Extract only the date part (e.g., "Mar 2, 2024") for the summary table
    const displayRefundDate = refundDate.includes(',')
        ? refundDate.split(',').slice(0, 2).join(',')
        : refundDate;

    const styles = {
        wrapper: {
            boxSizing: 'border-box',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            background: '#ffffff',
            margin: 0,
            padding: 0,
            color: '#1f2a44',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        container: {
            width: '100%',
            background: '#ffffff',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        },
        headerRefined: {
            width: '100%',
            position: 'relative',
            backgroundColor: '#ffffff',
            marginBottom: '20px',
            overflow: 'hidden'
        },
        headerImage: {
            width: '100%',
            display: 'block'
        },
        titleSection: {
            textAlign: 'center',
            marginBottom: '25px'
        },
        h1: {
            fontSize: '21px', // 22px -> 21px
            margin: '0 0 4px 0',
            fontWeight: '600',
            color: '#2f2f30ff',
            letterSpacing: '-0.2px'
        },
        receiptId: {
            fontSize: '13px', // 14px -> 13px
            color: '#8a94a6',
            fontWeight: '400'
        },
        infoRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 40px', // Increased padding to bring columns closer together
            marginBottom: '20px',
            gap: '12px'
        },
        infoBox: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1px'
        },
        label: {
            fontSize: '10px',
            textTransform: 'uppercase',
            color: '#7c8698',
            fontWeight: '600',
            letterSpacing: '0.4px',
            whiteSpace: 'nowrap'
        },
        value: {
            fontSize: '10px',
            color: '#515153ff',
            fontWeight: '500',
            whiteSpace: 'nowrap'
        },
        divider: {
            height: '1px',
            background: '#e6ebf3',
            margin: '0 20px 15px 20px' // 20px -> 15px
        },
        description: {
            padding: '0 20px',
            color: '#4b5568',
            lineHeight: '1.4',
            fontSize: '12px', // 13px -> 12px
            marginBottom: '15px' // 20px -> 15px
        },
        summaryBox: {
            background: '#f7f9fc',
            borderRadius: '10px',
            padding: '12px', // 16px -> 12px
            margin: '0 15px 20px 15px', // 25px -> 20px
            display: 'flex',
            flexDirection: 'column',
            gap: '8px' // 10px -> 8px
        },
        summaryTitle: {
            fontSize: '10px', // 11px -> 10px
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            color: '#7c8698',
            fontWeight: '700',
            marginBottom: '4px' // 6px -> 4px
        },
        row: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px', // 13px -> 12px
            color: '#4b5568'
        },
        boldRow: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px', // 13px -> 12px
            color: '#1f2a44',
            fontWeight: '600'
        },
        adjustedTotalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '14px',
            color: '#505052ff',
            fontWeight: '600',
            marginTop: '4px'
        },
        innerDivider: {
            height: '1px',
            background: '#e6ebf3',
            margin: '2px 0'
        },
        footer: {
            padding: '0 20px 40px 20px',
            fontSize: '10px', // 11px -> 10px
            color: '#8a94a6',
            textAlign: 'center',
            lineHeight: '1.5'
        },
        link: {
            color: '#4f5bd5',
            textDecoration: 'none',
            fontWeight: '500'
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                {/* Header Image */}
                <div style={styles.headerRefined}>
                    <img src="/forms/stripe_header.png" alt="Header" style={styles.headerImage} />
                </div>

                {/* Main Content */}
                <div style={styles.titleSection}>
                    <h1 style={styles.h1}>Refund from {project}</h1>
                    <div style={styles.receiptId}>{receiptNo}</div>
                </div>

                <div style={styles.infoRow}>
                    <div style={styles.infoBox}>
                        <span style={styles.label}>Refunded</span>
                        <strong style={styles.value}>{displayAmount}</strong>
                    </div>

                    <div style={{ ...styles.infoBox, textAlign: 'center' }}>
                        <span style={styles.label}>Date Issued</span>
                        <strong style={styles.value}>{refundDate}</strong>
                    </div>

                    <div style={{ ...styles.infoBox, textAlign: 'right', alignItems: 'flex-end' }}>
                        <span style={styles.label}>Refunded To</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', height: '14px' }}>
                            <img src="/assets/mastercard.png" alt="Card" style={{ height: '10px', opacity: 0.9, marginTop: '1px' }} />
                            <strong style={{ ...styles.value, lineHeight: '1', display: 'flex', alignItems: 'center' }}>- {cardLast4}</strong>
                        </div>
                    </div>
                </div>

                <div style={styles.divider}></div>

                <p style={styles.description}>
                    This email is to confirm that your refund has been issued by{' '}
                    <span style={{ color: '#4f5bd5', fontWeight: '700' }}>{project}</span>.
                    It can take approximately 10 days to appear on your statement.
                </p>

                <div style={{ padding: '0 20px', marginBottom: '8px' }}>
                    <span style={styles.label}>Summary</span>
                </div>

                {/* Summary Table */}
                <div style={styles.summaryBox}>
                    <div style={styles.row}>
                        <span>Transaction Date</span>
                        <span>{transactionDate}</span>
                    </div>

                    <div style={styles.row}>
                        <span>Refund Date</span>
                        <span>{displayRefundDate}</span>
                    </div>

                    <div style={styles.innerDivider}></div>

                    <div style={styles.boldRow}>
                        <span>Total</span>
                        <span>{displayAmount}</span>
                    </div>

                    <div style={styles.row}>
                        <span style={{ fontSize: '10px' }}>{refundDate}</span>
                        <span>{displayAmount}</span>
                    </div>

                    <div style={styles.innerDivider}></div>

                    <div style={styles.adjustedTotalRow}>
                        <span>Adjusted total</span>
                        <span>{displayAdjustedTotal}</span>
                    </div>
                </div>

                <div style={styles.divider}></div>

                {/* Footer Section */}
                <div style={styles.footer}>
                    If you have any questions, contact us at{' '}
                    <a href={`mailto:${email}`} style={styles.link}>{email}</a>
                    <br /><br />
                    Something wrong with the email? <a href="#" style={styles.link}>View it in your browser.</a>
                    <br /><br />
                    <div style={{ padding: '0 10px', fontSize: '9px' }}>
                        You're receiving this email because you made a purchase at {project},
                        which partners with <strong style={{ color: '#5b6987' }}>Stripe</strong>.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StripeTemplate;
