package vn.gmobile.uniboard.util;

import java.text.Normalizer;

public class TextUtils {
	public static String stripAccents(String s) {
		
		// strip except 2 special accents in vietnamese
		s = Normalizer.normalize(s, Normalizer.Form.NFD);
	    s = s.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
	    
	    // strip 2 special accents in vietnamese
	    s = s.replace('\u0111', 'd');
        s = s.replace('\u0110', 'd');
        
        // return string
        return s;
	}
}

