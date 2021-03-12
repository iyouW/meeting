/* eslint-disable no-unused-vars */
import HmacSha256 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

const userSigDict = {
    '31_test_1':'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsaG8SWpxSXxhlDJ4pTsxIKCzBQlK0MTAwMTSxNLY1OITGpFQWZRKlDc1NTUyMDAACJakpkLEjMDihoZm5mZQ03JTAea7V9u7ucRGumX6h6V45weYWrqVBWWYppplhujX1HmlmJh4OpXGloYkmPpWOVqq1QLAA1IMpM_',
    '31_test_2':'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsaG8SWpxSXxRlDJ4pTsxIKCzBQlK0MTAwMTSxNLY1OITGpFQWZRKlDc1NTUyMDAACJakpkLEjMDihoZmxuYQE3JTAea7Z2W65asHZZm5BppUW6QGaMfo28a6VzlWhTkVBji65KSXhCc5e6dH1Vu5uzlaKtUCwA33DKs',
    '31_test_3':'eJwtzFsLgkAUBOD-ss9hx70kCr0EEmVBkIJIINmucQyvu92I-numPs43w3xIuDtaD9URj1ALyGzIKFVlMMeBmZ0apU3KplLL27lpUBLP5gDc5S4TY6NeDXaqdyEEBYBRDZZ-W-RKmcOnrcZr-*0bva*yJPeDtg4OySZWURmvirB2CrxX7frtQEafp-ll60ZL8v0BL6szbw__',
    '31_test_4':'eJwtzMEKgkAUheF3mXXYHWfGUGgjqBsXgZYQgUhzlVuWg04hRO*eqcvzHfg-LE8z5409C5jrANvMmzQ*LdU0s*ClxcGWcj0Hfa*MIc0CLgGkL32hlgdHQz1OrpRyAWBRS4*-eZO6YufJtULN1D4Wr*oUd4cxE3Wn2tYUuYhunW14eNkmyFNIYu*qC4zOcs**Px6KMpI_',
    '31_test_5':'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsaG8SWpxSXxplDJ4pTsxIKCzBQlK0MTAwMTSxNLY1OITGpFQWZRKlDc1NTUyMDAACJakpkLEjMDihoZm5tbQk3JTAeanefj4ubuXpifb1aQE*ZZGhns65xa7OEbGZVVlVlkqB2cF*QY5p4cox9ikZhsq1QLACOuMxI_',
    '31_test_6':'eJwtzMEKgkAUheF3mXXIde6Mk0I7C4OCoGzhRtSZ4iLKoGMY0btn6vJ8B-4Pu52u3st0LGLcA7aZN2nTOnrQzOjnzvQuD9az13VhLWkW*QJAhCJEuTxmtNSZyaWUHAAWddT8LZiUowrFWqHn1K5cXR7e6pgm0Ai8ZM76yBVWZbwthrQwmCXjXrXZfTjv2PcH2TMyEA__'
};

export class TxSecurity {

    generateTxUserSig(secret, sdkAppId, userId, expire){
        return userSigDict[userId];
    }
    generateTxUserSigCore(secret, sdkAppId, userId, expire){
        const currentTime = new Date().valueOf();
        const feed = userId + sdkAppId + currentTime + expire;
        const base64String = btoa(encodeURI(feed));
        return Base64.stringify(HmacSha256(feed + base64String, secret)); 
    }
}