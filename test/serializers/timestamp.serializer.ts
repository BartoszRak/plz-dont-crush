export const timestampSerializer: jest.SnapshotSerializerPlugin = {
  test: data => data && data.timestamp,
  print: (data, serialize, indent) => {
    const { timestamp, ...rest } = data
    const content = [
      `"timestamp": __TIMESTAMP__,`,
      ...Object.entries(rest).map(
        ([key, value]) => `"${key}": ${serialize(value)},`,
      ),
    ].join(rest ? '\n' : '')

    return ['Object {', indent(content), '}'].join('\n')
  },
}

module.exports = timestampSerializer
