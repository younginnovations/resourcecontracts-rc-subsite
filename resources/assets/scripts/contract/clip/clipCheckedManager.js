import _ from "lodash";
import clipHelper from './clipHelper';

export default class ClipCheckedManager {

    body = $("body");

    elems = {
        checkClip: this.body.find(".table-contract .clipSelect"),
        checkAllVisible: this.body.find(".selectVisible"),
        checkedCount: this.body.find(".checkedCount"),
        deleteChecked: this.body.find(".removeSelectedBtn"),
        checkedInfo: this.body.find(".checkedInfo"),
        checkAllClips: this.body.find(".checkAllClips"),
        clearChecked: this.body.find(".clearChecked")
    };

    init = ()=> {
        const self = this;
        self.elems.checkClip.change(function (e) {
            self.checkClip(e);
        });

        self.elems.checkAllVisible.change(function (e) {
            self.checkAllVisible(e);
        });

        self.elems.deleteChecked.click((e)=> {
            self.deleteChecked(e)
        });

        self.elems.checkAllClips.click((e)=> {
            self.checkAllClips(e);
        })
    };

    checkClip = (e)=> {
        let checked = e.target.checked;
        let elem = $(e.target);
        let annotation_id = elem.attr("data-id");

        if (checked) {
            _.includes(checkedClips, annotation_id) ? false : checkedClips.push(annotation_id);
            elem.addClass("selected");
            elem.parents("tr").css("background-color", "#f7f7f7").addClass("selectedRow");
        } else {
            elem.removeClass("selected");
            checkedClips = checkedClips.filter(function (id) {
                return id != annotation_id;
            });

            elem.parents("tr").css("background-color", "transparent").removeClass("selectedRow");
            this.elems.checkedInfo.hide();
        }

        if (clipHelper.setCheckedCount() > 0) {
            this.elems.checkedInfo.show();
            this.elems.checkedInfo.find(".singular").show();
            this.elems.checkedInfo.find(".plural").hide();

            if (clipHelper.setCheckedCount() > 1) {
                this.elems.checkedInfo.find(".plural").show();
                this.elems.checkedInfo.find(".singular").hide();
            }
        } else {
            this.elems.checkedInfo.hide()
        }
    };

    checkAllVisible = (e)=> {
        e.stopPropagation();
        const self = this;
        let checked = e.target.checked;
        var currentRows = clipTable.rows().nodes();
        if (checked) {
            if (typeof checkedClips !== "undefined") {
                currentRows.each(function (row) {
                    $(row).find(".clipSelect").prop("checked", true).trigger("change");
                    $(row).css("background-color", "#f7f7f7").addClass("selectedRow");
                });
            }
        } else {
            currentRows.each(function (row) {

                $(row).find(".clipSelect").prop("checked", false).trigger("change");
                $(row).css("background-color", "transparent").removeClass("selectedRow");
            });
        }

        clipHelper.setCheckedCount();
        $(".checkAllClips span").text(clipHelper.getLocalClips() ? clipHelper.getLocalClips().length : 0);
    };

    deleteChecked = (e)=> {
        var confirmDeleteSelected = confirm(langClip.confirm_remove_selected);

        if (!confirmDeleteSelected) {
            return false;
        }

        let selectedRow = $(".selectedRow");
        clipTable.rows('.selectedRow').remove().draw(false);

        clipHelper.removeClip(e, checkedClips);

        this.elems.checkedInfo.hide();
        this.elems.checkAllVisible.prop("checked", false).trigger("change");

        var remainingClips = clipTable.rows().nodes().length;

        if (remainingClips < 1) {
            $("#clear-all").hide();
            $("#clip-annotations .clipMainWrapper").hide();
            $("#clip-annotations").append('<div class="no-record">' + langClip.currently_no_clips + '</div>');
        }
    };
}
