import axios from 'axios'
/* 'ticketing-ms-app-prod.xyz' */
const buildClient = ({ req }) => {
    if (typeof window === 'undefined') {
        return axios.create({
            baseURL: "http://www.ticketing-ms-app-prod.xyz",
            headers: req.headers
        })
    } else {
        return axios.create({
            baseURL: '/'
        })
    }
};
/* http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
 */
export default buildClient;



