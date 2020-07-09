<footer>
	<div class="footer__wrap">
		<p class="partner-description">
			{!! nl2br(getOptionText('footer_text')) !!}
		</p>
		<div class="partner-wrapper clearfix">
			@include('layout.partials.new-footer_partners')

			<!-- <div class="footer-bottom">
				<p class="footer-description">@lang('footer.licensed')
					<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" dir="rtl">(CC BY-SA 4.0)</a>
				</p>
			</div> -->
		</div>
	</div>
</footer>

@include('contract.partials.emailModal')
@include('layout.partials.analytics')
