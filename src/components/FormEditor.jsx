import React, { useState } from 'react';
import { ArrowLeft, Save, Download, Plus, Trash } from 'lucide-react';
import OverlayCanvas from './OverlayCanvas';
import RefundTemplate2 from './RefundTemplate2';
import { BANK_LAYOUTS } from '../data/coordinates';

const FormEditor = ({ formId, onBack }) => {
    const config = BANK_LAYOUTS[formId] || { pages: [], fields: {} };

    // Default columns if not defined
    const colKeys = config.fields?.columns ? Object.keys(config.fields.columns) : ['date', 'merchant', 'amount'];

    const [formData, setFormData] = useState(() => {
        const initial = {
            name: '',
            cardNo: '',
            phone: '',
            date: new Date().toISOString().split('T')[0],
            transactions: [
                colKeys.reduce((acc, key) => ({ ...acc, [key]: '' }), {})
            ]
        };

        // If config has defaults for fields, use them
        if (config.fields) {
            Object.entries(config.fields).forEach(([key, fieldCfg]) => {
                if (fieldCfg.defaultValue !== undefined) {
                    initial[key] = fieldCfg.defaultValue;
                }
            });
        }

        return initial;
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleTransactionChange = (idx, field, value) => {
        const newTransactions = [...formData.transactions];
        newTransactions[idx][field] = value;
        setFormData(prev => ({ ...prev, transactions: newTransactions }));
    };

    const addTransaction = () => {
        if (formData.transactions.length < 5) {
            const newTx = colKeys.reduce((acc, key) => ({ ...acc, [key]: '' }), {});
            setFormData(prev => ({
                ...prev,
                transactions: [...prev.transactions, newTx]
            }));
        }
    };

    const removeTransaction = (index) => {
        if (formData.transactions.length > 1) {
            setFormData(prev => ({
                ...prev,
                transactions: prev.transactions.filter((_, i) => i !== index)
            }));
        }
    };

    const renderFieldInput = (key, fieldConfig, formId) => {
        const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        const isCard = key.toLowerCase().includes('card');
        const isPhone = key.toLowerCase().includes('phone');
        const isEmail = key.toLowerCase().includes('email');
        const isName = key.toLowerCase().includes('name');

        return (
            <div key={key} className="space-y-2">
                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{label}</label>
                <input
                    type="text"
                    value={formData[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    className={`input-field ${isCard ? 'font-mono' : ''}`}
                    placeholder={`Enter ${label}`}
                    maxLength={fieldConfig.maxLength || (isCard ? 19 : (isPhone && formId === 'AXIS' ? 10 : undefined))}
                />
            </div>
        );
    };

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar - Inputs */}
            <div className="w-1/3 bg-white/80 border-r border-gray-200 p-6 overflow-y-auto backdrop-blur-md">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-700"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h2 className="text-xl font-bold">{formId} Dispute Form</h2>
                </div>

                <div className="space-y-6">
                    {/* Main Fields */}
                    {Object.entries(config.fields).map(([key, fieldConfig]) => {
                        if (['transactionsStart', 'rowHeight', 'columns', 'footer', 'fontSize', 'fontFamily', 'phone', 'date', 'backgroundStyle'].includes(key)) return null;
                        if (fieldConfig.pointerEvents === 'none') return null;
                        if (key.toLowerCase().endsWith('label') || key.toLowerCase().endsWith('box') || key.toLowerCase().endsWith('header') || key.toLowerCase().endsWith('text')) return null;
                        return renderFieldInput(key, fieldConfig, formId);
                    })}

                    {/* Footer fields (e.g., phone, date in footer) */}
                    {config.fields.footer && Object.entries(config.fields.footer).map(([key, fieldConfig]) => {
                        if (['phone', 'date'].includes(key)) return null;
                        return renderFieldInput(key, fieldConfig, formId);
                    })}

                    {formId !== 'STRIPE' && (
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Disputed Transactions</label>
                                <button
                                    onClick={addTransaction}
                                    className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors font-medium cursor-pointer"
                                >
                                    <Plus className="w-3 h-3" /> Add Row
                                </button>
                            </div>

                            <div className="space-y-3">
                                {formData.transactions.map((tx, idx) => (
                                    <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-200 grid grid-cols-12 gap-2 relative group hover:shadow-sm transition-shadow">
                                        {colKeys.map((colKey) => {
                                            let colSpan = "col-span-3";
                                            if (colKey === 'merchant') colSpan = "col-span-4";
                                            if (colKey.toLowerCase().includes('date') || colKey.toLowerCase().includes('amount')) colSpan = "col-span-2";
                                            if (colKeys.length > 4) {
                                                if (colKey === 'merchant') colSpan = "col-span-3";
                                                else colSpan = "col-span-2";
                                            }

                                            return (
                                                <div key={colKey} className={colSpan}>
                                                    <input
                                                        type={colKey.toLowerCase().includes('date') ? 'date' : 'text'}
                                                        value={tx[colKey] || ''}
                                                        onChange={(e) => handleTransactionChange(idx, colKey, e.target.value)}
                                                        placeholder={colKey.charAt(0).toUpperCase() + colKey.slice(1).replace(/([A-Z])/g, ' $1')}
                                                        className="w-full bg-transparent border-b border-gray-200 text-[10px] focus:border-blue-500 focus:outline-none py-1 text-gray-700"
                                                    />
                                                </div>
                                            );
                                        })}
                                        <button
                                            onClick={() => removeTransaction(idx)}
                                            className="absolute -right-2 -top-2 bg-red-500/20 text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                        >
                                            <Trash className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {formId !== 'STRIPE' && (
                        <div className="space-y-2 pt-4 border-t border-gray-200">
                            <label className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Phone / Date</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    className="input-field"
                                    placeholder={config.fields.phone?.placeholder || config.fields.footer?.phone?.placeholder || "+91 99999 99999"}
                                    maxLength={config.fields.phone?.maxLength || config.fields.footer?.phone?.maxLength || (formId === 'AXIS' ? 10 : undefined)}
                                />
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    className="input-field"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Preview Area */}
            <div className="flex-1 bg-gray-100 overflow-hidden flex flex-col relative">
                <div className="flex-1 overflow-auto p-8 flex justify-center bg-grid-pattern">
                    <OverlayCanvas
                        config={config}
                        data={formData}
                        formId={formId}
                    />
                </div>
            </div>
        </div>
    );
};

export default FormEditor;
