function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    //$data = 'hola PROMISE';
    //die("<script>console.log('.json_encode( $data ) .');</script>");
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
};