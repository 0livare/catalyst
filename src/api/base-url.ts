export default function getBaseUrl(): string {
  let useMockApi = false

  /// These # directives are processed by the ifdef-loader of webpack.
  /// The dev webpack config will set DEBUG to be true, the prod config
  /// will set it of course to false.
  /// #if DEBUG
  useMockApi = true
  /// #endif

  return useMockApi ? 'http://localhost:3001/' : '/'
}