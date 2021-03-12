import { TxSecurity } from './txSecurity';

export class SecurityFactory {
    
    static Create(){
        return new TxSecurity();
    }
}