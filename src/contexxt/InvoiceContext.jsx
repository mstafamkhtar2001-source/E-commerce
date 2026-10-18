import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

// --- 1. الكبسلة والتجريد (Encapsulation & Abstraction) ---
class BaseApiService {
  constructor(endpoint) {
    if (this.constructor === BaseApiService) {
      throw new Error("لا يمكن إنشاء كائن من الفئة المجردة BaseApiService مباشرة!");
    }
    this.endpoint = endpoint;  /* هنا عنوان api الى هيروح عليه الى هو api/invoices*/
  }
}

// --- 2. الوراثة وتعدد الأشكال (Inheritance & Polymorphism) ---
class InvoiceService extends BaseApiService {
  constructor(apiClient) {
    super('/api/invoices'); // بدون شرطة مائلة في الأول عشان يكمل على الـ baseURL تلقائياً
    this.api = apiClient; /*  الى فيه axoisهنا عنوان الباك ايند */
  }

  async getAllInvoices() {
    const response = await this.api.get(this.endpoint);
    return response.data;
  }

  async createInvoice(invoice) {
    // إرسال البيانات مباشرة كما هي بدون تعديل لضمان توافقها مع الـ Schema
    const response = await this.api.post(this.endpoint, invoice);
    return response.data;
  }

  async updateInvoice(invoiceNumber, invoice) {
    const response = await this.api.put(`${this.endpoint}/${invoiceNumber}`, invoice);
    return response.data;
  }

  async deleteInvoice(invoiceNumber) {
    await this.api.delete(`${this.endpoint}/${invoiceNumber}`);
    return invoiceNumber;
  }
}

// إنشاء نسخة من الـ Service باستخدام الـ api المعرف عندك
const invoiceService = new InvoiceService(api);

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  // 1. جلب الفواتير تلقائياً
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await invoiceService.getAllInvoices();
        setInvoices(data);
      } catch (error) {
        console.error("خطأ في جلب البيانات", error);
      }
    };
    fetchInvoices();
  }, []);

  // 2. دالة الإضافة
  const addInvoice = async (formattedInvoice) => {
    try {
      const newInvoice = await invoiceService.createInvoice(formattedInvoice);
      setInvoices(prev => [...prev, newInvoice]);
    } catch (error) {
      console.error("خطأ في إضافة الفاتورة:", error.response?.data || error.message);
    }
  };

  // 3. دالة الحذف
  const deleteInvoice = async (invoiceNumber) => {
    try {
      await invoiceService.deleteInvoice(invoiceNumber);
      setInvoices(prev => prev.filter(inv => inv.invoiceNumber !== invoiceNumber));
    } catch (error) {
      console.error("خطأ أثناء الحذف", error);
    }
  };

  // 4. دالة التعديل
  const updateInvoice = async (updatedInvoice) => {
    try {
      const result = await invoiceService.updateInvoice(updatedInvoice.invoiceNumber, updatedInvoice);
      setInvoices(prev => prev.map(inv => 
        inv.invoiceNumber === updatedInvoice.invoiceNumber ? result : inv
      ));
    } catch (error) {
      console.error("خطأ أثناء التعديل", error);
    }
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, deleteInvoice, updateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};