export function debugDeclaredAttributes(pointcloud, label = "POINT CLOUD") {
  const attrs = pointcloud?.pcoGeometry?.pointAttributes?.attributes ?? [];

  console.group(`${label} ATTRIBUTES`);
  console.log("count:", attrs.length);

  attrs.forEach((attr, index) => {
    console.log(index, {
      name: attr.name,
      range: attr.range,
      type: attr.type,
      numElements: attr.numElements,
      byteSize: attr.byteSize,
    });
  });

  console.groupEnd();
}