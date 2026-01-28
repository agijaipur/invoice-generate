import React, { useState } from 'react';
import { FileText, Receipt, Mail, ChevronRight, Search } from 'lucide-react';
import FormEditor from './FormEditor';
import { COORDINATES } from '../data/coordinates';

const sections = [
    {
        title: 'Dispute Forms',
        icon: FileText,
        items: ['HDFC', 'ICICI', 'AXIS', 'YES BANK', 'RBL', 'IDFC', 'INDUSIND', 'KOTAK'],
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
    },
    {
        title: 'Refund Invoices',
        icon: Receipt,
        items: ['STRIPE', 'REFUND 2', 'TBL REFUND GMAIL'],
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
    },
    {
        title: 'Gmail Formats',
        icon: Mail,
        items: ['GMAIL COMMUNICATION', 'AMAZON AE', 'AMAZON DE', 'AMAZON UK', 'AMAZON CA', 'AMAZON ES'],
        color: 'text-pink-600',
        bgColor: 'bg-pink-50'
    }
];

const Dashboard = () => {
    const [selectedForm, setSelectedForm] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    if (selectedForm) {
        return (
            <FormEditor
                formId={selectedForm}
                onBack={() => setSelectedForm(null)}
            />
        );
    }

    const getFormImage = (formId) => {
        const config = COORDINATES[formId];
        if (config?.pages?.[0]) return config.pages[0];
        if (config?.image) return config.image;
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-8">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                            Document Generator
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">Select a template to generate your document</p>
                    </div>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm ring-1 ring-gray-200 focus:ring-2 focus:ring-blue-500 bg-white transition-all"
                        />
                    </div>
                </header>

                <div className="space-y-16">
                    {sections.map((section) => {
                        // Filter items based on search
                        const filteredItems = section.items.filter(item =>
                            item.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        if (filteredItems.length === 0 && searchQuery) return null;

                        return (
                            <section key={section.title} className="space-y-6">
                                <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                                    <div className={`p-2 rounded-lg ${section.bgColor}`}>
                                        <section.icon className={`w-6 h-6 ${section.color}`} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {filteredItems.map((item) => {
                                        const bgImage = getFormImage(item);

                                        return (
                                            <button
                                                key={item}
                                                onClick={() => setSelectedForm(item)}
                                                className="group relative flex flex-col aspect-[3/4] rounded-2xl overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 hover:ring-blue-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                            >
                                                {/* Image Preview Area */}
                                                <div className="flex-1 w-full relative bg-gray-100 overflow-hidden">
                                                    {bgImage ? (
                                                        <div
                                                            className="absolute inset-0 bg-cover bg-top transition-transform duration-700 group-hover:scale-105"
                                                            style={{ backgroundImage: `url('${bgImage}')` }}
                                                        >
                                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent" />
                                                        </div>
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                                            <FileText className="w-16 h-16 opacity-50" />
                                                        </div>
                                                    )}

                                                    {/* Hover Overlay */}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-blue-900/10 transition-colors duration-300" />
                                                </div>

                                                {/* Content Area */}
                                                <div className="p-5 border-t border-gray-100 bg-white relative z-10 w-full text-left">
                                                    <div className="flex justify-between items-center group-hover:text-blue-600 transition-colors">
                                                        <span className="font-bold text-base truncate">{item}</span>
                                                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-1 font-medium">DISPUTE FORM</p>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
