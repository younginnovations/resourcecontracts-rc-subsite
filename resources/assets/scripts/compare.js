var compareList = function(cookieName) {
    return {
        "add": function(val) {
            var items = this.items();
            if(items)
            {
                items.push(val);
            }
            else
            {
                items = [val];
            }
            Cookies.set(cookieName, JSON.stringify(items));
        },
        "remove": function (index) {
            var items = this.items();
            items.splice(index, 1);
            Cookies.set(cookieName, JSON.stringify(items));
        },
        "clear": function() {
            Cookies.remove(cookieName);
        },
        "items": function() {
            var item = Cookies.getJSON(cookieName);
            if(item)
            {
                return item;
            }
            return [];
        },
        "isLimitExceed":function(){
            return this.items().length > 1;
        },
        "delete":function(id){
            console.log(id);
            var self = this;
            $.each(this.items(), function(index,val){
                if(val.id == id)
                {
                    self.remove(index);
                }
            });
        }
    }
};

var compareView = function(){
    return {
        "disableCheckbox" :function(el)
        {
            $(el).attr('disabled','disabled');
        },
        "enableCheckbox" :function(el)
        {
            $(el).removeAttr('disabled');
        },
        "itemTemplate" : function (id, title) {
            return '<li class="item-'+id+'"><a href="#" data-id="'+id+'" class="item-delete">delete</a>'+title+' </li>';
        },
        "removeItem":function(id)
        {
            $('.item-'+id).remove();
        },
        "render":function(el, items)
        {
            if(items.length > 0)
            {
                $('#compare-block').show();
            }else {
                $('#compare-block').hide();
            }

            $(el).html('');

            var self = this;

            $.each(items, function(index, val){

                $(el).append(self.itemTemplate(val.id,val.title));
            });
        }
    };
};

var list = new compareList('contractList');
var listView = new compareView('compareView');
render();

$(document).on('change','.compare', function(){
    var id = $(this).val();
    var checked = this.checked;
    if(checked)
    {
        var title=$('.title-'+id).text();
        if(!list.isLimitExceed())
        {
            list.add({"id":id,"title": title});
        }
    }else{
        list.delete(id);
        $("input[value="+id+"]").prop('checked', false);
    }

    render();
});

$(document).on('click','.item-delete', function(e) {
    e.preventDefault();
    var id = $(this).data('id');
    list.delete(id);
    listView.removeItem(id);
    render();

    $("input[value="+id+"]").prop('checked', false);

});

$(document).on('click','#compare-block button', function(){
    var url = contractURL;
    $.each(list.items(), function(index, value){
        url+='/'+value.id;
    });
    url+='/compare';
    window.location.href = url;

});

function render()
{
    listView.render('#compare-block ul', list.items());

    if(list.isLimitExceed()){
        listView.disableCheckbox('.compare');
    }else{
        listView.enableCheckbox('.compare');
    }

    $.each(list.items(), function(index, value){
        $("input[value="+value.id+"]").prop('checked', true);
    });

    if(list.items().length >1)
    {
        $('#compare-block button').show();
    }else{
        $('#compare-block button').hide();
    }
}