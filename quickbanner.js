var QuickBanner = function(option) {

    var self = this;

    var bannerTimeout = option.refreshRate; // refresh every 5 secs

    var dotBgcolor = option.indicator.backgroundColor;
    var dotColor = option.indicator.color;
    var dotStyle = option.indicator.style;

    var closeBtnStyle = option.close.style;

    var bannerContainerId = option.id;                     // Banner Container ID
    var dotContainerId    = option.id + "_dots";           // Dot Container ID
    var closeBtnId        = option.id + "_close";          // Close Button ID

    var BANNER_ID_PREFIX  = bannerContainerId + "_image_item_";
    var DOT_ID_PREFIX     = dotContainerId    + "_dot_item_";

    var bannerContainerDiv = $("#"+bannerContainerId);

    var banners = option.banners;
    var noOfBanners = banners.length;

    var visibleBannerIdx = 1;
    var bannerTimeoutFunction = null;

    // Add banners to banner container
    for (var bIdx=1; bIdx<=noOfBanners; bIdx++) {
        var bInfo = banners[bIdx-1];
        var bannerImageUrl = bInfo.imageUrl;
        var bannerOnClick = bInfo.onClick;
        var bannerId = BANNER_ID_PREFIX + bIdx; // Banner ID
        var bannerDiv = $('<img id="' + bannerId + '" onclick="' + bannerOnClick + '" style="position:absolute; top:0; left:0; cursor:pointer; transition-duration: 0.5s;" src="' + bannerImageUrl + '">');
        bannerContainerDiv.append(bannerDiv);
    }

    // add dot container
    var dotContainerDiv = $('<div id="' + dotContainerId + '" style="position:absolute; bottom:0; left:50%; cursor:pointer; z-index:10;"></div>');
    bannerContainerDiv.append(dotContainerDiv);

    // add dots in the bottom of the banner container
    if (noOfBanners > 1) {
        for (var idx=1; idx<=noOfBanners; idx++) {
            var dotId = DOT_ID_PREFIX + idx; // Dot ID
            var dotDiv = $('<i id="'+ dotId + '" class="fa ' + dotStyle + '" style="color:white; padding-bottom:1px; padding-left:2px; padding-right:2px; padding-bottom:2px; font-size:50%; transition-duration: 0.5s;"></i>');
            dotContainerDiv.append(dotDiv);
        }
    }

    // banner dot on click event (setTimeout is required)
    setTimeout(function() {
        var dots = $("[id^=" + DOT_ID_PREFIX + "]");
        dots.on("click", function() {
            clearTimeout(bannerTimeoutFunction); // stop the current swap banner timer
            visibleBannerIdx = parseInt($(this).attr("id").replace(DOT_ID_PREFIX,""));
            selectBanner(visibleBannerIdx);
            bannerTimeoutFunction = setTimeout(swapBanner, bannerTimeout);
        });
    }, 0);

    // add close button
    var closeBtnDiv = $('<div id="' + closeBtnId + '" style="position:absolute; top:0; right:0; cursor:pointer; z-index:10;"><i class="fa ' + closeBtnStyle + '" style="color:white; padding:2px; padding-right:4px;"></i></div>');

    // banner close button on click event
    closeBtnDiv.on("click", function() { bannerContainerDiv.fadeOut(); });

    bannerContainerDiv.append(closeBtnDiv);

    var selectBanner = function(idx) {
        // show the selected banner
        var banners = $("[id^=" + BANNER_ID_PREFIX + "]");
        var selectedBanner = $("#" + BANNER_ID_PREFIX + idx);
        banners.css('opacity',0);
        banners.css('zIndex',0);
        selectedBanner.css('opacity',1);
        selectedBanner.css('zIndex',1);

        // shift the dots highlight
        var dots = $("[id^=" + DOT_ID_PREFIX + "]");
        var selectedDot = $("#" + DOT_ID_PREFIX + idx);
        dots.css("color", dotBgcolor);
        selectedDot.css("color", dotColor);
    }

    selectBanner(1); // init first banner
    bannerContainerDiv.show();
    
    var swapBanner = function() {
        visibleBannerIdx++;
        if (visibleBannerIdx > noOfBanners) { visibleBannerIdx = 1; }
        selectBanner(visibleBannerIdx);
        bannerTimeoutFunction = setTimeout(swapBanner, bannerTimeout);
    }

    if (noOfBanners > 1) {
        bannerTimeoutFunction = setTimeout(swapBanner, bannerTimeout);
    }

}; 
