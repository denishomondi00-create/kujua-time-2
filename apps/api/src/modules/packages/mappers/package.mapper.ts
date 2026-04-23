export class PackageMapper {
  static toResponse(doc: any) {
    if (!doc) return null;
    const value = typeof doc.toObject === 'function' ? doc.toObject() : doc;
    return {
      id: String(value._id ?? value.id ?? ''),
      ...value,
      _id: undefined,
      __v: undefined,
    };
  }
}
