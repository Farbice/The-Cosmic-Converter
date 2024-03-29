function Moon() {
    return (
        <svg className="opacity-50"  xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
            <mask id="a" width="28.946" height="31.067" x="-3.089" y="-3.292" fill="#000" maskUnits="userSpaceOnUse">
                <path fill="#fff" d="M-3.089-3.292h28.946v31.067H-3.089z" />
                <path fillRule="evenodd"
                    d="M10.147 2.205c-5.292 1.71-8.369 7.29-6.913 12.723 1.503 5.609 7.268 8.938 12.877 7.435a10.483 10.483 0 0 0 6.467-5.046c-.171.055-.345.107-.521.154-5.61 1.503-11.374-1.826-12.877-7.435a10.48 10.48 0 0 1 .967-7.831Z"
                    clipRule="evenodd" />
            </mask>
            <path fill="#0E2C58"
                d="m10.147 2.205 1.748.972A2 2 0 0 0 9.53.302l.616 1.903Zm12.431 15.112 1.748.972a2 2 0 0 0-2.363-2.875l.615 1.903ZM5.166 14.41a8.515 8.515 0 0 1 5.596-10.302L9.532.302c-6.3 2.036-9.963 8.677-8.23 15.143l3.864-1.035Zm10.427 6.02a8.514 8.514 0 0 1-10.427-6.02l-3.864 1.035c1.789 6.676 8.65 10.638 15.327 8.85l-1.036-3.864Zm5.238-4.085a8.483 8.483 0 0 1-5.238 4.086l1.036 3.863a12.483 12.483 0 0 0 7.697-6.005l-3.495-1.945Zm1.132-.931c-.139.045-.28.087-.424.125l1.036 3.864c.209-.056.415-.117.619-.183l-1.23-3.806Zm-.424.125a8.514 8.514 0 0 1-10.428-6.02l-3.863 1.035c1.789 6.676 8.65 10.638 15.327 8.849l-1.036-3.864Zm-10.428-6.02a8.48 8.48 0 0 1 .784-6.342L8.399 1.232a12.48 12.48 0 0 0-1.151 9.322l3.863-1.036Z"
                mask="url(#a)" />
        </svg>
    );
}

export default Moon;