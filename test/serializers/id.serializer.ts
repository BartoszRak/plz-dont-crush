export const idSerializer: jest.SnapshotSerializerPlugin = {
  test: data => data && data.id,
  print: (data, serialize, indent) => {
    const { id, ...rest } = data
    const content = [
      `"id": __ID__,`,
      ...Object.entries(rest).map(
        ([key, value]) => `"${key}": ${serialize(value)},`,
      ),
    ].join(rest ? '\n' : '')

    return ['Object {', indent(content), '}'].join('\n')
  },
}

module.exports = idSerializer
