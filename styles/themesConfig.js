
import { lightBlue, red } from '@material-ui/core/colors';

const themesConfig = {

		palette: {
			type: 'light',

			
			background: {
				paper: '#FFFFFF',
				default: '#f6f7f9'
			},
			error: red
		},
		status: {
			danger: 'orange'
		},
        typography: {
            //fontFamily: [-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"].join(','),
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 600,
            useNextVariants: true,
            suppressDeprecationWarnings: true
        }

};

export default themesConfig;
