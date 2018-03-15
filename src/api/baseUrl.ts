export default function getBaseUrl(): string {
  return window.location.href.includes('useMockApi')
    ? 'http://localhost:3001/'
    : '/'
}