
export const vietQR = {
  generatePaymentQR: async (paymentData) => {
    try {
      // paymentData: { acc, bank, amount, des, template?, download? }
      const { acc, bank, amount, des, template = 'compact', download = false } = paymentData;
      
      const params = new URLSearchParams({
        acc: acc,
        bank: bank,
        amount: amount,
        des: des,
        template: template,
        download: download
      });
      
      const qrUrl = `https://qr.sepay.vn/img?${params.toString()}`;
      
      return {
        success: true,
        qrUrl: qrUrl,
        data: paymentData
      };
    } catch (error) {
      throw error;
    }   
  }
}