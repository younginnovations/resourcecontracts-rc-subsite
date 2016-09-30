<?php namespace App\Http\Services;

use App\Http\Services\Admin\OptionService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Translation\Translator;

/**
 * Class LocalizationService
 * @package App\Http\Services
 */
class LocalizationService
{
    /**
     * @var OptionService
     */
    protected $option;
    /**
     * @var Translator
     */
    protected $translator;
    /**
     * @var string
     */
    protected $defaultLang = 'en';
    /**
     * @var string
     */
    protected $key = 'lang';
    /**
     * @var Request
     */
    protected $request;
    /**
     * @var object
     */
    protected $lang;

    /**
     * LocalizationService constructor.
     *
     * @param Request       $request
     * @param OptionService $option
     */
    public function __construct(Request $request, OptionService $option)
    {
        $this->translator = app('translator');
        $this->option     = $option;
        $this->request    = $request;
        $this->initLanguage();
    }

    /**
     * Setup language
     */
    public function setup()
    {
        $currentLang = $this->getLanguage();

        if ($this->isValidLangCode($currentLang)) {
            $this->setLanguage($currentLang);
        }

        if ($this->isEnabled()) {
            $lang = $this->request->input('lang');
            $lang = $this->getLanguage($lang);
            $this->setLanguage($lang);
        }
    }

    /**
     * Get Language Code
     *
     * @param $lang
     *
     * @return string
     */
    public function getLanguage($lang = null)
    {
        $availableLang = $this->getEnabledLang();

        $browserLang = isset($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2) : '';

        if (!isset($_COOKIE[$this->key]) && array_key_exists($browserLang, $availableLang)) {
            $lang = $browserLang;
        }

        if (is_null($lang)) {
            $lang = isset($_COOKIE[$this->key]) ? $_COOKIE[$this->key] : $this->defaultLang;
        }

        if ($this->isValidLangCode($lang)) {
            return $lang;
        }

        return $this->defaultLang;
    }

    /**
     * Set Language
     *
     * @param $lang
     */
    public function setLanguage($lang)
    {
        $lang = trim(strtolower($lang));
        $this->translator->setLocale($lang);
        setcookie($this->key, $lang, Carbon::now()->addYear(1)->timestamp, '/');
    }

    /**
     * Determine if localization is enabled
     *
     * @return bool
     */
    public function isEnabled()
    {
        return $this->lang->enable == '1' ? true : false;
    }

    /**
     * Get all available languages
     *
     * @return mixed
     */
    public function getAllLang()
    {
        return config('language');
    }

    /**
     * Get current Language
     *
     * @return string
     */
    public function getCurrentLang()
    {
        return $this->translator->getLocale();
    }

    /**
     * Get current Language Direction
     *
     * @return string
     */
    public function getDirection()
    {
        $lang = $this->getCurrentLang();
        $info = $this->getAllLang()[$lang];

        return $info['dir'];
    }

    /**
     * Get Language switcher
     *
     * @return array
     */
    public function switcher()
    {
        $lang = $this->getEnabledLang();
        if (count($lang) > 1) {
            return $lang;
        }

        return [];
    }

    /**
     * Get Selected Languages
     *
     * @return array
     */
    protected function getEnabledLang()
    {
        $lang = [];
        $all  = $this->getAllLang();

        foreach ($this->lang->available as $code) {
            if (isset($all[$code])) {
                $lang [] = $all[$code];
            }
        }

        return $lang;
    }

    /**
     * Check for valid lang code
     *
     * @param $code
     *
     * @return string
     *
     */
    protected function isValidLangCode($code)
    {
        $languages = $this->getEnabledLang();

        foreach ($languages as $lang) {
            if ($lang['code'] == $code) {
                return true;
            }
        }

        return false;
    }

    /**
     * Initialize language
     *
     */
    protected function initLanguage()
    {
        $default = [
            "default"   => $this->defaultLang,
            "enable"    => false,
            'available' => [$this->defaultLang],
        ];

        $lang = $this->option->get('site_lang', true);

        if (!$lang) {
            $lang = $default;
        }

        $this->defaultLang = $lang['default'];
        $this->lang        = (object) $lang;
    }
}
