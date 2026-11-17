// =========================================================================
// TAREA 4 - BIG DATA (UNAD) - CONSULTAS EN MONGODB
// Caso de uso: Auditoría de Contratación Pública SECOP II (secop2_bigdata)
// Autor: Carlos Guillermo Herrera Meza
// =========================================================================

db = db.getSiblingDB("secop2_bigdata");

// -------------------------------------------------------------------------
// BLOQUE 1: CONSULTAS BÁSICAS (CRUD)
// -------------------------------------------------------------------------

// 1.1 Inserción (insertOne)
db.contratos.insertOne({
  numero_contrato: "CO1.PCCNTR.2026.0101",
  codigo_entidad: "ENT-011",
  codigo_contratista: "PROV-005",
  modalidad: "Contratación directa",
  objeto: "Soporte técnico y analítica de datos municipales",
  valor_cop: 45000000,
  duracion_dias: 120,
  estado: "En ejecución",
  fecha_firma: new Date("2026-11-15"),
  etiquetas: ["contratacion_directa", "prueba_crud"]
});

// 1.2 Selección (find y proyección con limit)
db.contratos.find({ numero_contrato: "CO1.PCCNTR.2026.0101" });

db.contratos.find(
  { codigo_entidad: "ENT-011" },
  {
    _id: 0,
    numero_contrato: 1,
    modalidad: 1,
    valor_cop: 1,
    estado: 1
  }
).limit(3);

// 1.3 Actualización (updateOne) y verificación
db.contratos.updateOne(
  { numero_contrato: "CO1.PCCNTR.2026.0101" },
  { $set: { estado: "Terminado", valor_cop: 52000000 } }
);

db.contratos.findOne({
  numero_contrato: "CO1.PCCNTR.2026.0101"
});

// 1.4 Eliminación (deleteOne) y verificación de conteo
db.contratos.deleteOne({
  numero_contrato: "CO1.PCCNTR.2026.0101"
});

db.contratos.countDocuments();

// -------------------------------------------------------------------------
// BLOQUE 2: FILTROS, OPERADORES Y JOIN ($lookup)
// -------------------------------------------------------------------------

// 2.1 Filtros numéricos y de conjunto ($gte, $in) con ordenamiento
db.contratos.find(
  {
    valor_cop: { $gte: 1000000000 },
    estado: { $in: ["En ejecución", "Terminado"] }
  },
  {
    _id: 0,
    numero_contrato: 1,
    modalidad: 1,
    valor_cop: 1,
    estado: 1
  }
).sort({ valor_cop: -1 }).limit(3);

// 2.2 Expresión regular ($regex) y filtro sobre arreglos (etiquetas)
db.contratos.find(
  {
    objeto: { $regex: "infraestructura", $options: "i" },
    etiquetas: "contratacion_directa"
  },
  {
    _id: 0,
    numero_contrato: 1,
    objeto: 1,
    valor_cop: 1,
    etiquetas: 1
  }
).limit(2);

// 2.3 Join entre colecciones con doble $lookup (contratos + entidades + contratistas)
db.contratos.aggregate([
  { $sort: { valor_cop: -1 } },
  { $limit: 3 },
  {
    $lookup: {
      from: "entidades",
      localField: "codigo_entidad",
      foreignField: "codigo_entidad",
      as: "entidad"
    }
  },
  { $unwind: "$entidad" },
  {
    $lookup: {
      from: "contratistas",
      localField: "codigo_contratista",
      foreignField: "codigo_contratista",
      as: "contratista"
    }
  },
  { $unwind: "$contratista" },
  {
    $project: {
      _id: 0,
      numero_contrato: 1,
      entidad: "$entidad.nombre_entidad",
      departamento: "$entidad.ubicacion.departamento",
      contratista: "$contratista.razon_social",
      valor_cop: 1
    }
  }
]);

// -------------------------------------------------------------------------
// BLOQUE 3: AGREGACIONES ESTADÍSTICAS (CONTAR, SUMAR, PROMEDIAR)
// -------------------------------------------------------------------------

// 3.1 Resumen estadístico global
db.contratos.aggregate([
  {
    $group: {
      _id: null,
      total_contratos: { $sum: 1 },
      inversion_total_cop: { $sum: "$valor_cop" },
      promedio_contrato: { $avg: "$valor_cop" },
      contrato_minimo: { $min: "$valor_cop" },
      contrato_maximo: { $max: "$valor_cop" }
    }
  },
  {
    $project: {
      _id: 0,
      total_contratos: 1,
      inversion_total_cop: 1,
      promedio_contrato: { $round: ["$promedio_contrato", 2] },
      contrato_minimo: 1,
      contrato_maximo: 1
    }
  }
]);

// 3.2 Resumen por modalidad de contratación
db.contratos.aggregate([
  {
    $group: {
      _id: "$modalidad",
      cantidad_contratos: { $sum: 1 },
      monto_total_cop: { $sum: "$valor_cop" },
      promedio_cop: { $avg: "$valor_cop" }
    }
  },
  {
    $project: {
      _id: 0,
      modalidad: "$_id",
      cantidad_contratos: 1,
      monto_total_cop: 1,
      promedio_cop: { $round: ["$promedio_cop", 2] }
    }
  },
  { $sort: { monto_total_cop: -1 } }
]);

// 3.3 Top 5 Departamentos por inversión total ($lookup + $group)
db.contratos.aggregate([
  {
    $lookup: {
      from: "entidades",
      localField: "codigo_entidad",
      foreignField: "codigo_entidad",
      as: "ent"
    }
  },
  { $unwind: "$ent" },
  {
    $group: {
      _id: "$ent.ubicacion.departamento",
      total_contratos: { $sum: 1 },
      inversion_total_cop: { $sum: "$valor_cop" },
      promedio_cop: { $avg: "$valor_cop" }
    }
  },
  {
    $project: {
      _id: 0,
      departamento: "$_id",
      total_contratos: 1,
      inversion_total_cop: 1,
      promedio_cop: { $round: ["$promedio_cop", 2] }
    }
  },
  { $sort: { inversion_total_cop: -1 } },
  { $limit: 5 }
]);