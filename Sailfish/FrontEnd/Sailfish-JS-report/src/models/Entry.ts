export default interface Entry {
    name: string;
    actual: string;
    expected: string;
    status?: string;
    precision?: string;
    systemPrecision?: string;
    subEntries?: Entry[];
}