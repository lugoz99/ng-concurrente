export interface Variant {
  _id: string;
  CHROM: string;
  POS: string;
  ID: string | null;
  REF: string;
  ALT: string;
  QUAL: string;
  FILTER: string;
  INFO: string;
  FORMAT: string;
  output_CH?: { [key: string]: string }; // Agrupa campos dinámicos CH
  output_CS?: { [key: string]: string }; // Agrupa campos dinámicos CS
}



export interface VariantResponse {
  variants: Variant[]; // Lista de variantes recuperadas
  last_id: string | null; // Último ID recuperado en la página
  documents_retrieved: number; // Número de documentos recuperados en esta solicitud
  total_documents: number; // Total de documentos en la colección
  page_size: number; // Tamaño de la página solicitada
  duration_seconds: number; // Duración de la solicitud en segundos

}


export interface VariantSort {
  [key: string]: any; // Permite el acceso dinámico
  CHROM?: string;
  FILTER?: string;
  INFO?: string;
  FORMAT?: string;
}
