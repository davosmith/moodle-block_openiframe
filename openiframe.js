M.blocks_openiframe = {
    Y: null,
    showingpanel: false,
    spinnerpic: null,

    init: function(Y, options) {
        this.Y = Y;
        this.spinnerpic = options.spinner;

        // Hide header / blocks if in an iframe
        if (window.self != window.top) {
            var header = document.getElementById('page-header');
            if (header) {
                header.style.display = 'none';
            }
            var leftblocks = document.getElementById('region-pre');
            if (leftblocks) {
                leftblocks.style.display = 'none';
            }
            var rightblocks = document.getElementById('region-post');
            if (rightblocks) {
                rightblocks.style.display = 'none';
            }
            var mainregion = document.getElementById('region-main-box');
            if (mainregion) {
                mainregion.style.left = '0';
            }
        }

        var els = document.getElementsByClassName('section');
        var self = this;
        var i, j, el, li;

        for (i=0; i<els.length, el=els[i]; i++) {
            var lis = el.getElementsByTagName('li');
            for (j=0; j<lis.length, li=lis[j]; j++) {
                var links = li.getElementsByTagName('a');
                if (links.length == 0) {
                    continue;
                }

                var link = links[0];
                link.onclick = null;
                link.addEventListener('click', function(e) { return self.open_iframe(e); }, false);
            }
        }
    },

    open_iframe: function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.showingpanel) {
            return false;
        }

        this.showingpanel = true;

        url = e.currentTarget.href;
        var div = document.createElement('div');
        var spinner = document.createElement('img');
        spinner.setAttribute('src', this.spinnerpic);
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", url);
        ifrm.style.cssText = "width: 100%; height: 100%; display: none;";
        ifrm.onload = function() {
            ifrm.style.display = 'block';
            spinner.parentNode.removeChild(spinner);
        }
        div.appendChild(ifrm);
        div.appendChild(spinner);

        var panel = new this.Y.Panel({
            bodyContent: div,
            width: '80%',
            height: '80%',
            zIndex: 200,
            centered: true,
            modal: true,
            visible: true,
            render: true
        });

        var self = this;
        panel.after('visibleChange', function(e) {
            if (!panel.get('visible')) {
                panel.destroy(true);
                self.showingpanel = false;
            }
        });

        return false;
    }

};
