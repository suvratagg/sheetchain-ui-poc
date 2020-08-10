export interface File{
    fileName: string;
    fileHash: string;
    userName: string;
}

export interface txnHistory{
    timestamp: {epochSecond: number; nano: number};
    fileDetails: File;
    timestampDate: string;
    transactionId: string;
}