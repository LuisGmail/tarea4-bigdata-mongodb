// Script de creación y carga inicial - Caso de uso SECOP II (Tarea 4 Big Data)
db = db.getSiblingDB("secop2_bigdata");

// Limpiar colecciones previas si existieran
db.entidades.drop();
db.contratistas.drop();
db.contratos.drop();

// 1. Insertar 20 Entidades Públicas de Colombia
db.entidades.insertMany([
  { codigo_entidad: "ENT-001", nombre_entidad: "Instituto Colombiano para la Evaluación de la Educación (ICFES)", nit: "860024301", ubicacion: { departamento: "Distrito Capital de Bogotá", ciudad: "Bogotá D.C." }, orden: "Nacional", sector: "Educación" },
  { codigo_entidad: "ENT-002", nombre_entidad: "Servicio Nacional de Aprendizaje (SENA)", nit: "899999034", ubicacion: { departamento: "Distrito Capital de Bogotá", ciudad: "Bogotá D.C." }, orden: "Nacional", sector: "Educación" },
  { codigo_entidad: "ENT-003", nombre_entidad: "Instituto Nacional de Vías (INVÍAS)", nit: "800215807", ubicacion: { departamento: "Distrito Capital de Bogotá", ciudad: "Bogotá D.C." }, orden: "Nacional", sector: "Transporte" },
  { codigo_entidad: "ENT-004", nombre_entidad: "Ministerio de Salud y Protección Social", nit: "900474727", ubicacion: { departamento: "Distrito Capital de Bogotá", ciudad: "Bogotá D.C." }, orden: "Nacional", sector: "Salud" },
  { codigo_entidad: "ENT-005", nombre_entidad: "Ministerio de Tecnologías de la Información y las Comunicaciones", nit: "899999053", ubicacion: { departamento: "Distrito Capital de Bogotá", ciudad: "Bogotá D.C." }, orden: "Nacional", sector: "Tecnología" },
  { codigo_entidad: "ENT-006", nombre_entidad: "Gobernación de Antioquia", nit: "890900286", ubicacion: { departamento: "Antioquia", ciudad: "Medellín" }, orden: "Territorial", sector: "Gobierno" },
  { codigo_entidad: "ENT-007", nombre_entidad: "Alcaldía Mayor de Bogotá - Secretaría de Educación", nit: "899999061", ubicacion: { departamento: "Distrito Capital de Bogotá", ciudad: "Bogotá D.C." }, orden: "Territorial", sector: "Educación" },
  { codigo_entidad: "ENT-008", nombre_entidad: "Gobernación del Valle del Cauca", nit: "890399029", ubicacion: { departamento: "Valle del Cauca", ciudad: "Cali" }, orden: "Territorial", sector: "Gobierno" },
  { codigo_entidad: "ENT-009", nombre_entidad: "Gobernación del Atlántico", nit: "890102006", ubicacion: { departamento: "Atlántico", ciudad: "Barranquilla" }, orden: "Territorial", sector: "Gobierno" },
  { codigo_entidad: "ENT-010", nombre_entidad: "Gobernación del Magdalena", nit: "800103920", ubicacion: { departamento: "Magdalena", ciudad: "Santa Marta" }, orden: "Territorial", sector: "Gobierno" },
  { codigo_entidad: "ENT-011", nombre_entidad: "Alcaldía Municipal de Plato", nit: "891780066", ubicacion: { departamento: "Magdalena", ciudad: "Plato" }, orden: "Territorial", sector: "Infraestructura" },
  { codigo_entidad: "ENT-012", nombre_entidad: "Gobernación de Santander", nit: "890201235", ubicacion: { departamento: "Santander", ciudad: "Bucaramanga" }, orden: "Territorial", sector: "Gobierno" },
  { codigo_entidad: "ENT-013", nombre_entidad: "Gobernación de Cundinamarca", nit: "899999114", ubicacion: { departamento: "Cundinamarca", ciudad: "Bogotá D.C." }, orden: "Territorial", sector: "Salud" },
  { codigo_entidad: "ENT-014", nombre_entidad: "Gobernación de Bolívar", nit: "890480059", ubicacion: { departamento: "Bolívar", ciudad: "Cartagena" }, orden: "Territorial", sector: "Turismo" },
  { codigo_entidad: "ENT-015", nombre_entidad: "Alcaldía de Medellín - Secretaría de Infraestructura", nit: "890905211", ubicacion: { departamento: "Antioquia", ciudad: "Medellín" }, orden: "Territorial", sector: "Infraestructura" },
  { codigo_entidad: "ENT-016", nombre_entidad: "Alcaldía de Barranquilla", nit: "890102018", ubicacion: { departamento: "Atlántico", ciudad: "Barranquilla" }, orden: "Territorial", sector: "Salud" },
  { codigo_entidad: "ENT-017", nombre_entidad: "Instituto Colombiano de Bienestar Familiar (ICBF)", nit: "899999239", ubicacion: { departamento: "Distrito Capital de Bogotá", ciudad: "Bogotá D.C." }, orden: "Nacional", sector: "Social" },
  { codigo_entidad: "ENT-018", nombre_entidad: "Departamento Administrativo Nacional de Estadística (DANE)", nit: "899999027", ubicacion: { departamento: "Distrito Capital de Bogotá", ciudad: "Bogotá D.C." }, orden: "Nacional", sector: "Tecnología" },
  { codigo_entidad: "ENT-019", nombre_entidad: "Gobernación del Tolima", nit: "800113672", ubicacion: { departamento: "Tolima", ciudad: "Ibagué" }, orden: "Territorial", sector: "Agricultura" },
  { codigo_entidad: "ENT-020", nombre_entidad: "Gobernación de Boyacá", nit: "891800498", ubicacion: { departamento: "Boyacá", ciudad: "Tunja" }, orden: "Territorial", sector: "Educación" }
]);

// 2. Insertar 30 Contratistas
const listaContratistas = [];
const nombresEmpresas = [
  "Soluciones Tecnológicas Andinas S.A.S.", "Constructora Caribe Ingeniería S.A.S.",
  "Grupo Logístico del Magdalena S.A.S.", "Consultores Integrales Bogotá Ltda.",
  "Suministros Médicos Nacionales S.A.", "Redes y Datos de Colombia S.A.S.",
  "Interventorías y Obras del Norte S.A.S.", "Alimentos Escolares del Caribe S.A.S.",
  "Innovación Digital Pública S.A.S.", "Ingeniería Vial del Sur S.A.",
  "María Fernanda Rodríguez López", "Carlos Andrés Mendoza Pérez",
  "Laura Camila Gómez Castillo", "Jorge Enrique Navarro Díaz",
  "Ana Lucía Ospina Martínez", "Asesorías Ambientales Valle S.A.S.",
  "Servicios Educativos Virtuales S.A.S.", "Equipos y Maquinaria Antioquia S.A.",
  "Desarrollo Territorial del Atlántico S.A.S.", "Auditorías y Control Fiscal S.A.S.",
  "Diana Carolina Torres Vargas", "Luis Eduardo Ramírez Mejía",
  "Paula Andrea Castro Moreno", "Javier Alejandro Suárez Ortiz",
  "Conectividad Rural Colombiana S.A.S.", "Infraestructura Sostenible Tolima S.A.S.",
  "Editorial Académica Nacional S.A.", "Seguridad Informática Global S.A.S.",
  "Transportes Especiales Boyacá Ltda.", "Consultoría Estratégica Santander S.A.S."
];
const ciudades = ["Bogotá D.C.", "Medellín", "Barranquilla", "Cali", "Santa Marta", "Plato", "Bucaramanga", "Cartagena", "Ibagué", "Tunja"];

for (let i = 1; i <= 30; i++) {
  const num = String(i).padStart(3, "0");
  const nombre = nombresEmpresas[i - 1];
  const esJuridica = nombre.includes("S.A.") || nombre.includes("S.A.S.") || nombre.includes("Ltda.");
  listaContratistas.push({
    codigo_contratista: "PROV-" + num,
    razon_social: nombre,
    nit_documento: String(900100000 + i * 137),
    tipo_persona: esJuridica ? "Jurídica" : "Natural",
    es_pyme: i % 3 !== 0,
    ciudad_domicilio: ciudades[(i - 1) % ciudades.length]
  });
}
db.contratistas.insertMany(listaContratistas);

// 3. Insertar 100 Contratos Electrónicos
const entPool = [
  "ENT-001", "ENT-001", "ENT-002", "ENT-002", "ENT-003", "ENT-004", "ENT-005",
  "ENT-006", "ENT-006", "ENT-007", "ENT-008", "ENT-009", "ENT-010", "ENT-011",
  "ENT-012", "ENT-013", "ENT-014", "ENT-015", "ENT-016", "ENT-017", "ENT-018",
  "ENT-019", "ENT-020", "ENT-001", "ENT-007"
];
const modalidades = [
  "Contratación directa", "Contratación directa", "Contratación directa",
  "Contratación directa", "Contratación directa", "Contratación directa",
  "Contratación directa", "Contratación régimen especial", "Mínima cuantía",
  "Selección abreviada", "Contratación directa", "Contratación directa",
  "Contratación directa", "Contratación directa", "Contratación directa",
  "Contratación directa", "Contratación directa", "Contratación régimen especial",
  "Mínima cuantía", "Licitación pública"
];
const objetos = [
  "Prestación de servicios profesionales de ingeniería de datos y analítica",
  "Mantenimiento y mejoramiento de infraestructura vial terciaria",
  "Adquisición de equipos tecnológicos y licenciamiento en la nube",
  "Suministro de insumos médicos y dotación hospitalaria",
  "Servicio de alimentación escolar y logística territorial",
  "Implementación de conectividad digital en sedes educativas",
  "Interventoría técnica, administrativa y financiera de obra pública",
  "Consultoría especializada para auditoría y transparencia fiscal",
  "Capacitación en competencias digitales y formación técnica",
  "Desarrollo de plataforma web de gestión documental"
];
const montosBase = [
  24500000, 48000000, 75000000, 120000000, 350000000,
  18500000, 89000000, 1250000000, 62000000, 2400000000
];
const estados = ["En ejecución", "En ejecución", "Terminado", "Liquidado"];

const listaContratos = [];
for (let i = 1; i <= 100; i++) {
  const num = String(i).padStart(4, "0");
  const mod = modalidades[(i - 1) % modalidades.length];
  const valor = montosBase[(i - 1) % montosBase.length] + (i * 500000);
  const etiquetas = [];
  if (valor >= 1000000000) etiquetas.push("megacontrato", "auditoria_prioritaria");
  if (mod === "Contratación directa") etiquetas.push("contratacion_directa");
  else etiquetas.push("proceso_competitivo");

  listaContratos.push({
    numero_contrato: "CO1.PCCNTR.2026." + num,
    codigo_entidad: entPool[(i - 1) % entPool.length],
    codigo_contratista: "PROV-" + String(((i - 1) % 30) + 1).padStart(3, "0"),
    modalidad: mod,
    objeto: objetos[(i - 1) % objetos.length],
    valor_cop: valor,
    duracion_dias: 30 * (((i - 1) % 12) + 1),
    estado: estados[(i - 1) % estados.length],
    fecha_firma: new Date(2026, (i - 1) % 10, ((i * 3) % 28) + 1),
    etiquetas: etiquetas
  });
}
db.contratos.insertMany(listaContratos);

print("=== CARGA COMPLETADA EN secop2_bigdata ===");
print("Entidades:", db.entidades.countDocuments());
print("Contratistas:", db.contratistas.countDocuments());
print("Contratos:", db.contratos.countDocuments());
print("Total documentos:", db.entidades.countDocuments() + db.contratistas.countDocuments() + db.contratos.countDocuments());