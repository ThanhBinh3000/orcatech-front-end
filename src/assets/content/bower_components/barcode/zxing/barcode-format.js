const BarcodeFormat = {
    /** Aztec 2D barcode format. */
    AZTEC: 'AZTEC',

    /** CODABAR 1D format. */
    CODABAR: 'CODABAR',

    /** Code 39 1D format. */
    CODE_39: 'CODE_39',

    /** Code 93 1D format. */
    CODE_93: 'CODE_93',

    /** Code 128 1D format. */
    CODE_128: 'CODE_128',

    /** Data Matrix 2D barcode format. */
    DATA_MATRIX: 'DATA_MATRIX',

    /** EAN-8 1D format. */
    EAN_8: 'EAN_8',

    /** EAN-13 1D format. */
    EAN_13: 'EAN_13',

    /** ITF (Interleaved Two of Five) 1D format. */
    ITF: 'ITF',

    /** MaxiCode 2D barcode format. */
    MAXICODE: 'MAXICODE',

    /** PDF417 format. */
    PDF_417: 'PDF_417',

    /** QR Code 2D barcode format. */
    QR_CODE: 'QR_CODE',

    /** RSS 14 */
    RSS_14: 'RSS_14',

    /** RSS EXPANDED */
    RSS_EXPANDED: 'RSS_EXPANDED',

    /** UPC-A 1D format. */
    UPC_A: 'UPC_A',

    /** UPC-E 1D format. */
    UPC_E: 'UPC_E',

    /** UPC/EAN extension format. Not a stand-alone format. */
    UPC_EAN_EXTENSION: 'UPC_EAN_EXTENSION'
};

const EncodeHintType = {
    /**
     * Specifies what degree of error correction to use, for example in QR Codes.
     * Type depends on the encoder. For example for QR codes it's type
     * {@link com.google.zxing.qrcode.decoder.ErrorCorrectionLevel ErrorCorrectionLevel}.
     * For Aztec it is of type {@link Integer}, representing the minimal percentage of error correction words.
     * For PDF417 it is of type {@link Integer}, valid values being 0 to 8.
     * In all cases, it can also be a {@link String} representation of the desired value as well.
     * Note: an Aztec symbol should have a minimum of 25% EC words.
     */
    ERROR_CORRECTION: 'ERROR_CORRECTION',

    /**
     * Specifies what character encoding to use where applicable (type {@link String})
     */
    CHARACTER_SET: 'CHARACTER_SET',

    /**
     * Specifies the matrix shape for Data Matrix (type {@link com.google.zxing.datamatrix.encoder.SymbolShapeHint})
     */
    DATA_MATRIX_SHAPE: 'DATA_MATRIX_SHAPE',

    /**
     * Specifies a minimum barcode size (type {@link Dimension}). Only applicable to Data Matrix now.
     *
     * @deprecated use width/height params in
     * {@link com.google.zxing.datamatrix.DataMatrixWriter#encode(String, BarcodeFormat, int, int)}
     */
    /*@Deprecated*/
    MIN_SIZE: 'MIN_SIZE',

    /**
     * Specifies a maximum barcode size (type {@link Dimension}). Only applicable to Data Matrix now.
     *
     * @deprecated without replacement
     */
    /*@Deprecated*/
    MAX_SIZE: 'MAX_SIZE',

    /**
     * Specifies margin, in pixels, to use when generating the barcode. The meaning can vary
     * by format; for example it controls margin before and after the barcode horizontally for
     * most 1D formats. (Type {@link Integer}, or {@link String} representation of the integer value).
     */
    MARGIN: 'MARGIN',

    /**
     * Specifies whether to use compact mode for PDF417 (type {@link Boolean}, or "true" or "false"
     * {@link String} value).
     */
    PDF417_COMPACT: 'PDF417_COMPACT',

    /**
     * Specifies what compaction mode to use for PDF417 (type
     * {@link com.google.zxing.pdf417.encoder.Compaction Compaction} or {@link String} value of one of its
     * enum values).
     */
    PDF417_COMPACTION: 'PDF417_COMPACTION',

    /**
     * Specifies the minimum and maximum number of rows and columns for PDF417 (type
     * {@link com.google.zxing.pdf417.encoder.Dimensions Dimensions}).
     */
    PDF417_DIMENSIONS: 'PDF417_DIMENSIONS',

    /**
     * Specifies the required number of layers for an Aztec code.
     * A negative number (-1, -2, -3, -4) specifies a compact Aztec code.
     * 0 indicates to use the minimum number of layers (the default).
     * A positive number (1, 2, .. 32) specifies a normal (non-compact) Aztec code.
     * (Type {@link Integer}, or {@link String} representation of the integer value).
     */
    AZTEC_LAYERS: 'AZTEC_LAYERS',

    /**
     * Specifies the exact version of QR code to be encoded.
     * (Type {@link Integer}, or {@link String} representation of the integer value).
     */
    QR_VERSION: 'QR_VERSION',
};

const DecodeHintType  = {
    /**
     * Unspecified, application-specific hint. Maps to an unspecified {@link Object}.
     */
    OTHER: 'OTHER'/*(Object.class)*/,

    /**
     * Image is a pure monochrome image of a barcode. Doesn't matter what it maps to;
     * use {@link Boolean#TRUE}.
     */
    PURE_BARCODE: 'PURE_BARCODE'/*(Void.class)*/,

    /**
     * Image is known to be of one of a few possible formats.
     * Maps to a {@link List} of {@link BarcodeFormat}s.
     */
    POSSIBLE_FORMATS: 'POSSIBLE_FORMATS'/*(List.class)*/,

    /**
     * Spend more time to try to find a barcode; optimize for accuracy, not speed.
     * Doesn't matter what it maps to; use {@link Boolean#TRUE}.
     */
    TRY_HARDER: 'TRY_HARDER'/*(Void.class)*/,

    /**
     * Specifies what character encoding to use when decoding, where applicable (type String)
     */
    CHARACTER_SET: 'CHARACTER_SET'/*(String.class)*/,

    /**
     * Allowed lengths of encoded data -- reject anything else. Maps to an {@code Int32Array}.
     */
    ALLOWED_LENGTHS: 'ALLOWED_LENGTHS'/*(Int32Array.class)*/,

    /**
     * Assume Code 39 codes employ a check digit. Doesn't matter what it maps to;
     * use {@link Boolean#TRUE}.
     */
    ASSUME_CODE_39_CHECK_DIGIT: 'ASSUME_CODE_39_CHECK_DIGIT'/*(Void.class)*/,

    /**
     * Assume the barcode is being processed as a GS1 barcode, and modify behavior as needed.
     * For example this affects FNC1 handling for Code 128 (aka GS1-128). Doesn't matter what it maps to;
     * use {@link Boolean#TRUE}.
     */
    ASSUME_GS1: 'ASSUME_GS1'/*(Void.class)*/,

    /**
     * If true, return the start and end digits in a Codabar barcode instead of stripping them. They
     * are alpha, whereas the rest are numeric. By default, they are stripped, but this causes them
     * to not be. Doesn't matter what it maps to; use {@link Boolean#TRUE}.
     */
    RETURN_CODABAR_START_END: 'RETURN_CODABAR_START_END'/*(Void.class)*/,

    /**
     * The caller needs to be notified via callback when a possible {@link ResultPoint}
     * is found. Maps to a {@link ResultPointCallback}.
     */
    NEED_RESULT_POINT_CALLBACK: 'NEED_RESULT_POINT_CALLBACK'/*(ResultPointCallback.class)*/,


    /**
     * Allowed extension lengths for EAN or UPC barcodes. Other formats will ignore this.
     * Maps to an {@code Int32Array} of the allowed extension lengths, for example [2], [5], or [2, 5].
     * If it is optional to have an extension, do not set this hint. If this is set,
     * and a UPC or EAN barcode is found but an extension is not, then no result will be returned
     * at all.
     */
    ALLOWED_EAN_EXTENSIONS: 'ALLOWED_EAN_EXTENSIONS'/*(Int32Array.class)*/,

    // End of enumeration values.


    /**
     * Data type the hint is expecting.
     * Among the possible values the {@link Void} stands out as being used for
     * hints that do not expect a value to be supplied (flag hints). Such hints
     * will possibly have their value ignored, or replaced by a
     * {@link Boolean#TRUE}. Hint suppliers should probably use
     * {@link Boolean#TRUE} as directed by the actual hint documentation.
     */
    // private valueType: Class<?>

    // DecodeHintType(valueType: Class<?>) {
    //   this.valueType = valueType
    // }

    // public getValueType(): Class<?> {
    //   return valueType
    // }
};