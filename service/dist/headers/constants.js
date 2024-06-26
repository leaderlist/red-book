const LOCAL_ID_SECRET_VERSION = '0';
const CHARSET = 'abcdefghijklmnopqrstuvwxyz1234567890';
const RC4_SECRET_VERSION_KEY = 'b1b1';
const RC4_SECRET_VERSION = '1';
const LOCAL_ID_KEY = 'a1';
const MINI_BROSWER_INFO_KEY = 'b1';
const WEB_ID_KEY = 'webId';
const WEB_SESSION_KEY = 'web_session';
const SDT_SOURCE_KEY = 'sdt_source_storage_key';
const INIT_STORAGE_VALUES = [
    'I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeSBMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR1QL+5Ii6sdnoeSfqYHqwl2qt5BfqJIvFbNLQ+ZPw7Ixdsxuwr4qtkIkrwIi/skZc3ICLdI3Oe0utl2ADZsL5eDSJsSPwXIEvsiVtJOPw8BuwfPpdeTDWOIx4VIiu6ZPwbJqt0IxHyoMAeVutWIvvs6PtPIiMzIih2sf6sS7h5rUOsfut4sM5eWz4VLoJeSWuGIx/eDqtcIios0qtlbLijPdpsI3deiqt3pW7e1g+2IhQaIET2NgqDI3zJqZ88IizuBVwUIvGF4e6edb5ekVtCIxAsfe3s0duZIh5e3DhSPqwDIkOs3BJs6Sesiqw/rd/eDuwjICFGzAoe0qwlzn/sSuwbI34LI3pTouwwaPwyosVNJpJs0j0siqtsIkOeDU3s6MW6IkJsSL7sx9IuIkJe1qtdIkqlOqwPtqtMIxve6utYIkes1Vw6IEosfqtANqwysqwIIvrdIxuz89q02ZJe3qtFIhu4IiAedqwoeWccpUOsDskuIhRytPwwzqwAIkesWqtuqIAsVF6s1IbLIiD=',
    '1',
];
const INIT_SDT_SOURCE = {
    validate: true,
    commonPatch: [
        '/fe_api/burdock/v2/note/post',
        '/api/sns/web/v1/comment/post',
        '/api/sns/web/v1/note/like',
        '/api/sns/web/v1/note/collect',
        '/api/sns/web/v1/user/follow',
        '/api/sns/web/v1/feed',
        '/api/sns/web/v1/login/activate',
        '/api/sns/web/v1/note/metrics_report',
        '/api/redcaptcha',
        '/api/store/jpd/main',
        '/phoenix/api/strategy/getAppStrategy',
    ],
    signUrl: 'https://fe-video-qc.xhscdn.com/fe-platform/6e0d0a976c31ec4cf07d8dfaea68aefe79a8c678.js',
    signVersion: '1',
    url: 'https://fe-video-qc.xhscdn.com/fe-platform/7a700537086390bf42ed95a3c3b675820f791299.js',
    reportUrl: '/api/sec/v1/shield/webprofile',
    desVersion: '2',
};
module.exports = {
    LOCAL_ID_SECRET_VERSION,
    CHARSET,
    RC4_SECRET_VERSION_KEY,
    RC4_SECRET_VERSION,
    LOCAL_ID_KEY,
    MINI_BROSWER_INFO_KEY,
    WEB_ID_KEY,
    WEB_SESSION_KEY,
    INIT_STORAGE_VALUES,
    SDT_SOURCE_KEY,
    INIT_SDT_SOURCE,
};
//# sourceMappingURL=constants.js.map