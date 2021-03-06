import { Control} from '@angular/common';

interface ValidationResult {
 [key:string]:boolean;
}

export class PasswordValidator {
	static checkComplexityPwd(control: Control): ValidationResult { 
   		let anUpperCase = /[A-Z]/;
	    let aLowerCase = /[a-z]/;
	    let aNumber = /[0-9]/;
	    // let aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

	    let numUpper = 0;
	    let numLower = 0;
	    let numNums = 0;
	    let numSpecials = 0;
		for (let i = 0; i < control.value.length; i++) {
			if (anUpperCase.test(control.value[i]))
	            numUpper++;
			else if (aLowerCase.test(control.value[i]))
	            numLower++;
			else if (aNumber.test(control.value[i]))
	            numNums++;
	        // else if (aSpecial.test(p[i]))
	        //     numSpecials++;
	    }

		if (numUpper < 1 || numLower < 1 || numNums < 1 /*|| numSpecials < 2*/) {
			let error: ValidationResult = {
				"checkComplexityPwd": true
			};

		    if (numUpper < 1) {
				error["upper"] = true;
		    }
			if (numLower < 1){
				error["lower"] = true;
			}
			if (numNums < 1){
				error["numbers"] = true;
			}
			return error;
		}

		return null;
 	}
}