export const WHATSAPP_NUMBER = "918289887322";
export const SITE_NAME = "m.smeclabs.ac.in";
export const SITE_URL = "https://m.smeclabs.ac.in";

export function getWhatsAppMessageHeader() {
  return [
    `*Site:* ${SITE_NAME}`,
    `*Website:* ${SITE_URL}`,
  ];
}
