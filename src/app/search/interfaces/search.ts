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
  variants: Variant[]; // Lista de variantes
  total_count: number; // Total de elementos
  current_page: number; // Página actual
  page_size: number; // Tamaño de página
  total_pages: number; // Total de páginas
  next_page: number | null; // Siguiente página (si existe)
}
