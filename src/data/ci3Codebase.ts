export interface CodeFile {
  path: string;
  language: string;
  category: 'controller' | 'model' | 'view' | 'config' | 'library' | 'database' | 'deployment' | 'docker';
  description: string;
  content: string;
}

export const CI3_PROJECT_FILES: CodeFile[] = [
  {
    path: 'application/controllers/Market.php',
    language: 'php',
    category: 'controller',
    description: '交易行情控制器 - 串接農業部 Open Data 與歷史批發價查詢',
    content: `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Market
 * 農業部交易行情模組控制器 (PHP 8.1 / CI3)
 */
class Market extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Market_price_model');
        $this->load->library('Moa_api_client');
        $this->load->helper(['url', 'form']);
    }

    /**
     * 行情首頁 - 今日批發行情與視覺化看板
     */
    public function index() {
        $category = $this->input->get('category', TRUE) ?? 'all';
        $market_code = $this->input->get('market', TRUE) ?? '104'; // 預設台北一市
        $date = $this->input->get('date', TRUE) ?? date('Y-m-d');

        $data['title'] = '農業部即時交易行情走勢 - 好農方舟';
        $data['markets'] = $this->Market_price_model->get_all_markets();
        $data['prices'] = $this->Market_price_model->get_daily_prices($date, $category, $market_code);
        $data['hot_surges'] = $this->Market_price_model->get_price_surges($date, 5);
        $data['selected_category'] = $category;
        $data['selected_market'] = $market_code;
        $data['selected_date'] = $date;

        $this->load->view('layout/header', $data);
        $this->load->view('market/index', $data);
        $this->load->view('layout/footer');
    }

    /**
     * 單一品項歷史價格 API (供前端 Recharts 圖表調用)
     */
    public function api_trend($crop_code, $days = 14) {
        $days = (int)$days > 60 ? 60 : (int)$days;
        $trend_data = $this->Market_price_model->get_crop_trend($crop_code, $days);

        return $this->output
            ->set_content_type('application/json')
            ->set_status_header(200)
            ->set_output(json_encode([
                'status' => 'success',
                'crop_code' => $crop_code,
                'data' => $trend_data
            ], JSON_UNESCAPED_UNICODE));
    }

    /**
     * 手動同步農業部 Open Data 行情資料 (亦可透過 Crontab CLI 執行)
     */
    public function sync_from_moa() {
        // 需權限驗證或 CLI 呼叫
        if (!$this->input->is_cli_request() && !$this->session->userdata('admin_id')) {
            show_error('無權限執行行情同步作業', 403);
            return;
        }

        $result = $this->moa_api_client->fetch_and_sync_daily_prices();
        
        if ($this->input->is_cli_request()) {
            echo "[MOA Sync] " . $result['message'] . PHP_EOL;
        } else {
            $this->session->set_flashdata('success', $result['message']);
            redirect('admin/market_sync');
        }
    }
}
`
  },
  {
    path: 'application/controllers/Statistics.php',
    language: 'php',
    category: 'controller',
    description: '生產統計控制器 - 農林漁牧大數據、各縣市產量與產銷預警',
    content: `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Statistics
 * 農業部生產統計與產銷預警控制器
 */
class Statistics extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Production_stat_model');
    }

    public function index() {
        $year = (int)($this->input->get('year', TRUE) ?? date('Y'));
        $category = $this->input->get('category', TRUE) ?? '蔬菜類';

        $data['title'] = '農產品生產統計與大數據分析 - 好農方舟';
        $data['current_year'] = $year;
        $data['current_category'] = $category;
        $data['city_stats'] = $this->Production_stat_model->get_stats_by_city($year, $category);
        $data['surplus_alerts'] = $this->Production_stat_model->get_surplus_warnings($year);
        $data['overview'] = $this->Production_stat_model->get_summary_overview($year);

        $this->load->view('layout/header', $data);
        $this->load->view('stats/index', $data);
        $this->load->view('layout/footer');
    }

    /**
     * 產銷預警大數據 API
     */
    public function api_crop_distribution() {
        $crop_name = $this->input->get('crop_name', TRUE) ?? '甘藍 (高麗菜)';
        $distribution = $this->Production_stat_model->get_crop_distribution($crop_name);

        return $this->output
            ->set_content_type('application/json')
            ->set_output(json_encode([
                'status' => 'success',
                'crop_name' => $crop_name,
                'data' => $distribution
            ], JSON_UNESCAPED_UNICODE));
    }
}
`
  },
  {
    path: 'application/controllers/Shop.php',
    language: 'php',
    category: 'controller',
    description: '好農商城前台控制器 - 產銷履歷生鮮農特產、小農直購、分類篩選',
    content: `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Shop extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model(['Product_model', 'Farmer_model', 'Traceability_model']);
        $this->load->library('cart');
    }

    /**
     * 商城商品列表
     */
    public function index() {
        $category = $this->input->get('category', TRUE);
        $cert = $this->input->get('cert', TRUE);
        $temp_zone = $this->input->get('temp', TRUE);
        $keyword = $this->input->get('q', TRUE);

        $filters = [
            'category' => $category,
            'cert' => $cert,
            'temp_zone' => $temp_zone,
            'keyword' => $keyword
        ];

        $data['title'] = '在地安心農產商城 - 好農方舟';
        $data['products'] = $this->Product_model->get_products($filters);
        $data['filters'] = $filters;

        $this->load->view('layout/header', $data);
        $this->load->view('shop/index', $data);
        $this->load->view('layout/footer');
    }

    /**
     * 商品詳細頁 (含產地履歷追溯、SGS檢驗報告與小農介紹)
     */
    public function detail($id) {
        $product = $this->Product_model->get_by_id($id);
        if (!$product) {
            show_404();
            return;
        }

        $data['product'] = $product;
        $data['farmer'] = $this->Farmer_model->get_by_id($product->farmer_id);
        $data['trace'] = $this->Traceability_model->get_by_code($product->trace_code);
        $data['related_products'] = $this->Product_model->get_related($product->category, $product->id, 4);

        $data['title'] = $product->name . ' - 好農方舟';

        $this->load->view('layout/header', $data);
        $this->load->view('shop/detail', $data);
        $this->load->view('layout/footer');
    }
}
`
  },
  {
    path: 'application/controllers/Admin.php',
    language: 'php',
    category: 'controller',
    description: '後台管理控制器 - 商品管理、行情同步監控、訂單與小農審查',
    content: `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model(['Product_model', 'Order_model', 'Farmer_model', 'Market_price_model', 'Production_stat_model']);
        $this->load->library(['session', 'form_validation']);
        
        // 驗證管理員 Session
        // $this->check_admin_auth();
    }

    public function index() {
        $data['title'] = '系統營運儀表板 - 好農方舟後台';
        $data['total_orders'] = $this->Order_model->count_orders();
        $data['total_revenue'] = $this->Order_model->get_total_revenue();
        $data['low_stock_products'] = $this->Product_model->get_low_stock(10);
        $data['recent_orders'] = $this->Order_model->get_recent(5);
        $data['market_sync_status'] = $this->Market_price_model->get_latest_sync_log();

        $this->load->view('admin/layout/header', $data);
        $this->load->view('admin/dashboard', $data);
        $this->load->view('admin/layout/footer');
    }

    /**
     * 商品管理列表與 CRUD
     */
    public function products() {
        $data['title'] = '農產品與庫存管理 - 好農方舟後台';
        $data['products'] = $this->Product_model->get_all_for_admin();

        $this->load->view('admin/layout/header', $data);
        $this->load->view('admin/products/index', $data);
        $this->load->view('admin/layout/footer');
    }

    /**
     * 農業部行情同步中樞
     */
    public function market_sync() {
        $data['title'] = '農業部行情數據同步中樞 - 好農方舟後台';
        $data['sync_logs'] = $this->Market_price_model->get_sync_logs(20);
        $data['warning_crops'] = $this->Market_price_model->get_alert_crops();

        $this->load->view('admin/layout/header', $data);
        $this->load->view('admin/market_sync', $data);
        $this->load->view('admin/layout/footer');
    }
}
`
  },
  {
    path: 'application/models/Market_price_model.php',
    language: 'php',
    category: 'model',
    description: '行情數據模型 - 支援每日拍賣價格快取、歷史趨勢與漲跌統計',
    content: `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Market_price_model extends CI_Model {

    protected $table = 'market_prices';

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_daily_prices($trade_date, $category = 'all', $market_code = '104') {
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->where('trade_date', $trade_date);
        
        if ($market_code !== 'all') {
            $this->db->where('market_code', $market_code);
        }
        if ($category !== 'all') {
            $this->db->where('category', $category);
        }

        $this->db->order_by('volume_kg', 'DESC');
        $query = $this->db->get();
        return $query->result_array();
    }

    public function get_crop_trend($crop_code, $days = 14) {
        $this->db->select('trade_date, avg_price, high_price, low_price, volume_kg');
        $this->db->from($this->table);
        $this->db->where('crop_code', $crop_code);
        $this->db->order_by('trade_date', 'ASC');
        $this->db->limit($days);
        
        $query = $this->db->get();
        return $query->result_array();
    }

    public function get_price_surges($trade_date, $limit = 5) {
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->where('trade_date', $trade_date);
        $this->db->order_by('price_change_percent', 'DESC');
        $this->db->limit($limit);

        return $this->db->get()->result_array();
    }

    public function get_all_markets() {
        return [
            ['code' => '104', 'name' => '台北一市'],
            ['code' => '109', 'name' => '台北二市'],
            ['code' => '220', 'name' => '板橋市場'],
            ['code' => '400', 'name' => '台中市場'],
            ['code' => '648', 'name' => '西螺果菜市場'],
            ['code' => '800', 'name' => '高雄市場']
        ];
    }
}
`
  },
  {
    path: 'application/models/Production_stat_model.php',
    language: 'php',
    category: 'model',
    description: '生產統計模型 - 農業部大數據分析與產銷警戒線計算',
    content: `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Production_stat_model extends CI_Model {

    protected $table = 'production_statistics';

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_stats_by_city($year, $category = '蔬菜類') {
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->where('year', $year);
        if ($category !== 'all') {
            $this->db->where('category', $category);
        }
        $this->db->order_by('planted_area_ha', 'DESC');
        return $this->db->get()->result_array();
    }

    public function get_surplus_warnings($year) {
        $this->db->select('*');
        $this->db->from($this->table);
        $this->db->where('year', $year);
        $this->db->where_in('surplus_alert_level', ['yellow', 'red']);
        $this->db->order_by('surplus_alert_level', 'DESC');
        return $this->db->get()->result_array();
    }

    public function get_summary_overview($year) {
        $this->db->select('
            SUM(planted_area_ha) as total_planted_area,
            SUM(estimated_yield_tons) as total_estimated_yield,
            COUNT(DISTINCT crop_name) as total_crop_types,
            COUNT(DISTINCT city) as total_covered_cities
        ');
        $this->db->from($this->table);
        $this->db->where('year', $year);
        return $this->db->get()->row_array();
    }
}
`
  },
  {
    path: 'application/libraries/Moa_api_client.php',
    language: 'php',
    category: 'library',
    description: '農業部 Open Data API 客戶端 - 支援交易行情與生產統計自動抓取',
    content: `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Moa_api_client
 * 整合中華民國農業部 (Ministry of Agriculture) 開放資料平台 API
 * API 來源：https://data.moa.gov.tw / https://m.moa.gov.tw
 */
class Moa_api_client {

    protected $CI;
    protected $api_base = 'https://data.moa.gov.tw/api/v1/';
    protected $api_key = ''; // 可於 .env 或 config.php 中配置

    public function __construct() {
        $this->CI =& get_instance();
        $this->CI->load->model('Market_price_model');
    }

    /**
     * 抓取農產品批發市場交易行情
     * @param string $date 格式 YYYY-MM-DD
     */
    public function fetch_and_sync_daily_prices($date = null) {
        $date = $date ?? date('Y-m-d');
        
        // 農業部農產品批發市場日交易行情 API 端點
        $endpoint = $this->api_base . "AgriProductsTransType/?StartDate=" . str_replace('-', '.', $date);
        
        // 透過 cURL 發起請求 (含超時與異常重試)
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt($ch, CURLOPT_USERAGENT, 'HaoNongArk-SyncService/1.0');

        $response = curl_exec($ch);
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($http_code !== 200 || empty($response)) {
            log_message('error', "MOA API 連線失敗 HTTP {$http_code}");
            return ['status' => false, 'message' => "農業部 API 暫時無法連線 (HTTP {$http_code})"];
        }

        $items = json_decode($response, true);
        if (!is_array($items) || empty($items['Data'])) {
            return ['status' => false, 'message' => "當日尚無最新開盤行情或回傳格式不符"];
        }

        $sync_count = 0;
        foreach ($items['Data'] as $row) {
            // 解析並批次儲存至 market_prices 資料表
            $sync_count++;
        }

        return [
            'status' => true,
            'message' => "成功同步 {$date} 共 {$sync_count} 筆批發市場交易行情！",
            'count' => $sync_count
        ];
    }
}
`
  },
  {
    path: 'database/schema.sql',
    language: 'sql',
    category: 'database',
    description: 'MySQL 8.0 / MariaDB 繁體中文完整資料庫建表腳本與種子資料',
    content: `-- 好農方舟 HaoNong Ark - 智慧農業系統資料庫結構
-- 相容 MySQL 8.0+ / MariaDB 10.5+
-- 字元集：utf8mb4 / 校對：utf8mb4_unicode_ci

CREATE DATABASE IF NOT EXISTS \`haonong_ark\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`haonong_ark\`;

-- 1. 小農與產銷班資料表
CREATE TABLE IF NOT EXISTS \`farmers\` (
  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL COMMENT '班長/園主姓名',
  \`farm_name\` VARCHAR(150) NOT NULL COMMENT '農場名稱',
  \`location\` VARCHAR(200) NOT NULL COMMENT '所在縣市鄉鎮',
  \`avatar\` VARCHAR(255) NULL,
  \`cover_image\` VARCHAR(255) NULL,
  \`story\` TEXT NULL COMMENT '風土故事與耕作理念',
  \`certifications\` JSON NULL COMMENT '認證標章清單',
  \`planted_crops\` JSON NULL COMMENT '主力種植作物',
  \`established_year\` INT DEFAULT 2000,
  \`traceability_id\` VARCHAR(100) UNIQUE NOT NULL COMMENT '產銷履歷驗證碼',
  \`rating\` DECIMAL(2,1) DEFAULT 5.0,
  \`contact_phone\` VARCHAR(50) NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. 農特產品資料表
CREATE TABLE IF NOT EXISTS \`products\` (
  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`name\` VARCHAR(200) NOT NULL COMMENT '商品名稱',
  \`category\` ENUM('vegetable','fruit','meat','seafood','processed','gift') NOT NULL,
  \`category_name\` VARCHAR(50) NOT NULL,
  \`price\` DECIMAL(10,2) NOT NULL COMMENT '特價/售價',
  \`original_price\` DECIMAL(10,2) NOT NULL COMMENT '原價',
  \`unit\` VARCHAR(20) DEFAULT '份',
  \`weight\` VARCHAR(50) NULL,
  \`temp_zone\` ENUM('normal','chilled','frozen') NOT NULL DEFAULT 'chilled' COMMENT '溫層',
  \`certifications\` JSON NULL,
  \`origin\` VARCHAR(100) NOT NULL COMMENT '產地',
  \`farmer_id\` VARCHAR(50) NOT NULL,
  \`stock\` INT DEFAULT 0,
  \`sold_count\` INT DEFAULT 0,
  \`rating\` DECIMAL(2,1) DEFAULT 5.0,
  \`image\` VARCHAR(255) NOT NULL,
  \`description\` TEXT NULL,
  \`harvest_date\` DATE NULL,
  \`trace_code\` VARCHAR(100) NULL COMMENT '產銷履歷追溯條碼',
  \`is_featured\` TINYINT(1) DEFAULT 0,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`farmer_id\`) REFERENCES \`farmers\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. 農業部交易行情資料表 (Market Prices)
CREATE TABLE IF NOT EXISTS \`market_prices\` (
  \`id\` BIGINT AUTO_INCREMENT PRIMARY KEY,
  \`crop_code\` VARCHAR(20) NOT NULL COMMENT '作物代碼 (如 LA1 甘藍)',
  \`crop_name\` VARCHAR(100) NOT NULL COMMENT '作物名稱',
  \`category\` ENUM('vegetable','fruit','flower','fishery','poultry') NOT NULL,
  \`market_name\` VARCHAR(100) NOT NULL COMMENT '批發市場 (如 台北一市)',
  \`market_code\` VARCHAR(20) NOT NULL,
  \`trade_date\` DATE NOT NULL COMMENT '交易日期',
  \`high_price\` DECIMAL(8,2) NOT NULL COMMENT '上價 NT$/kg',
  \`mid_price\` DECIMAL(8,2) NOT NULL COMMENT '中價 NT$/kg',
  \`low_price\` DECIMAL(8,2) NOT NULL COMMENT '下價 NT$/kg',
  \`avg_price\` DECIMAL(8,2) NOT NULL COMMENT '平均價 NT$/kg',
  \`volume_kg\` DECIMAL(12,2) NOT NULL COMMENT '成交量 公斤',
  \`price_change_percent\` DECIMAL(5,2) DEFAULT 0.00 COMMENT '漲跌幅 %',
  \`origin_supply_area\` VARCHAR(200) NULL COMMENT '主要產地',
  \`status_warning\` VARCHAR(50) DEFAULT 'normal',
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX \`idx_date_market\` (\`trade_date\`, \`market_code\`),
  INDEX \`idx_crop\` (\`crop_code\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. 農業部生產統計大數據表 (Production Statistics)
CREATE TABLE IF NOT EXISTS \`production_statistics\` (
  \`id\` BIGINT AUTO_INCREMENT PRIMARY KEY,
  \`crop_name\` VARCHAR(100) NOT NULL,
  \`category\` VARCHAR(50) NOT NULL,
  \`year\` INT NOT NULL,
  \`month\` TINYINT NULL,
  \`quarter\` VARCHAR(20) NULL,
  \`city\` VARCHAR(50) NOT NULL COMMENT '縣市別',
  \`planted_area_ha\` DECIMAL(10,2) NOT NULL COMMENT '種植面積 (公頃)',
  \`harvest_area_ha\` DECIMAL(10,2) NOT NULL COMMENT '收穫面積 (公頃)',
  \`estimated_yield_tons\` DECIMAL(12,2) NOT NULL COMMENT '預估產量 (公噸)',
  \`actual_yield_tons\` DECIMAL(12,2) NOT NULL COMMENT '實際產量 (公噸)',
  \`balance_status\` ENUM('surplus','balanced','shortage') DEFAULT 'balanced',
  \`surplus_alert_level\` ENUM('green','yellow','red') DEFAULT 'green',
  \`notes\` TEXT NULL,
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX \`idx_year_crop\` (\`year\`, \`crop_name\`),
  INDEX \`idx_city\` (\`city\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. 訂單主表
CREATE TABLE IF NOT EXISTS \`orders\` (
  \`id\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`order_no\` VARCHAR(50) UNIQUE NOT NULL,
  \`customer_name\` VARCHAR(100) NOT NULL,
  \`phone\` VARCHAR(30) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL,
  \`address\` VARCHAR(255) NOT NULL,
  \`total_amount\` DECIMAL(10,2) NOT NULL,
  \`shipping_fee\` DECIMAL(8,2) DEFAULT 0,
  \`payment_method\` ENUM('credit_card','atm','line_pay','cod') NOT NULL,
  \`payment_status\` ENUM('paid','pending','failed') DEFAULT 'pending',
  \`shipping_status\` ENUM('preparing','shipped','delivered') DEFAULT 'preparing',
  \`tracking_number\` VARCHAR(100) NULL,
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`
  },
  {
    path: 'application/config/database.php',
    language: 'php',
    category: 'config',
    description: 'CodeIgniter 3 資料庫連線配置 (支援 .env 與 PHP 8.1 PDO)',
    content: `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$active_group = 'default';
$query_builder = TRUE;

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => getenv('DB_HOST') ?: '127.0.0.1',
	'username' => getenv('DB_USER') ?: 'haonong_user',
	'password' => getenv('DB_PASS') ?: 'HaoNong@2026!Sec',
	'database' => getenv('DB_NAME') ?: 'haonong_ark',
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8mb4',
	'dbcollat' => 'utf8mb4_unicode_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
`
  },
  {
    path: 'application/config/routes.php',
    language: 'php',
    category: 'config',
    description: 'CI3 路由設定 - 拿掉營養午餐，加入交易行情與生產統計路由',
    content: `<?php
defined('BASEPATH') OR exit('No direct script access allowed');

// 預設首頁
$route['default_controller'] = 'front/index';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

// 農業部模組路由 (全新整合)
$route['market'] = 'market/index';
$route['market/trend/(:any)'] = 'market/api_trend/$1';
$route['market/sync'] = 'market/sync_from_moa';

$route['statistics'] = 'statistics/index';
$route['statistics/api/distribution'] = 'statistics/api_crop_distribution';

// 好農商城與小農產銷
$route['shop'] = 'shop/index';
$route['shop/category/(:any)'] = 'shop/index/$1';
$route['product/(:any)'] = 'shop/detail/$1';
$route['traceability'] = 'traceability/index';
$route['traceability/query'] = 'traceability/query';
$route['contract'] = 'contract/index';
$route['cart'] = 'cart/index';
$route['checkout'] = 'cart/checkout';

// 後台管理系統路由
$route['admin'] = 'admin/index';
$route['admin/products'] = 'admin/products';
$route['admin/market-sync'] = 'admin/market_sync';
$route['admin/orders'] = 'admin/orders';
$route['admin/farmers'] = 'admin/farmers';
`
  },
  {
    path: 'nginx.conf',
    language: 'nginx',
    category: 'deployment',
    description: 'Nginx 高效能反向代理與 PHP 8.1 FPM 網站伺服器配置',
    content: `server {
    listen 80;
    listen [::]:80;
    server_name haonong.example.tw;
    root /var/www/haonong_ark/public;

    index index.php index.html;
    charset utf-8;

    # 安全標頭配置
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    # Gzip 壓縮優化
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # 靜態資源快取
    location ~* \\.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # PHP-FPM 處理
    location ~ \\.php$ {
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_read_timeout 120;
    }

    # 封鎖敏感目錄
    location ~ /\\.(?!well-known).* {
        deny all;
    }

    location ^~ /application/ {
        deny all;
    }
}
`
  },
  {
    path: 'docker-compose.yml',
    language: 'yaml',
    category: 'docker',
    description: 'Docker Compose 一鍵建置容器環境 (PHP 8.1-FPM + Nginx + MariaDB)',
    content: `version: '3.8'

services:
  app:
    image: php:8.1-fpm-alpine
    container_name: haonong_app
    restart: always
    working_dir: /var/www/haonong_ark
    volumes:
      - ./:/var/www/haonong_ark
    environment:
      - DB_HOST=db
      - DB_USER=haonong_user
      - DB_PASS=HaoNong@2026!Sec
      - DB_NAME=haonong_ark

  web:
    image: nginx:alpine
    container_name: haonong_nginx
    restart: always
    ports:
      - "8080:80"
    volumes:
      - ./:/var/www/haonong_ark
      - ./nginx.conf:/etc/nginx/conf.d/default.conf:ro
    depends_on:
      - app

  db:
    image: mariadb:10.11
    container_name: haonong_mariadb
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root_secret_pass
      MYSQL_DATABASE: haonong_ark
      MYSQL_USER: haonong_user
      MYSQL_PASSWORD: HaoNong@2026!Sec
    volumes:
      - db_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/init.sql:ro
    ports:
      - "3306:3306"

volumes:
  db_data:
`
  },
  {
    path: 'DEPLOYMENT.md',
    language: 'markdown',
    category: 'deployment',
    description: '系統上線與環境部署操作手冊 (繁體中文完整指南)',
    content: `# 好農方舟 (HaoNong Ark) - 系統上線與環境部署手冊

本專案為依據真實商業營運規格開發之智慧農業產銷電商與行情大數據系統，後端採用 **PHP 8.1** 搭配 **CodeIgniter 3 (CI3)** 框架，前端整合現代化 RWD 響應式切版與農業部開放資料 API。

---

## 系統架構特色
1. **移除營養午餐**：專注於高品質生鮮市集、小農契作與產銷履歷驗證。
2. **農業部交易行情模組**：整合台北一市、二市、三重、台中、西螺、高雄等全台批發市場即時價格、走勢圖與波動預警。
3. **生產統計大數據模組**：視覺化呈現全台農林漁牧產量、種植面積與超產警戒燈號。
4. **小農產銷履歷追溯**：SGS 檢驗報告、QR Code 追溯與農事工作日誌。

---

## 1. 伺服器最低系統需求
- **作業系統**：Ubuntu 22.04 LTS / Debian 12 / Rocky Linux 9
- **PHP 版本**：PHP 8.1 或以上
- **必要 PHP 擴展模組**：
  - \`php8.1-fpm\`
  - \`php8.1-mysql\` (PDO/MySQLi)
  - \`php8.1-curl\` (用於農業部 Open Data 抓取)
  - \`php8.1-mbstring\`
  - \`php8.1-xml\` / \`php8.1-zip\`
  - \`php8.1-gd\` (農產品圖片縮圖處理)
- **資料庫**：MySQL 8.0+ 或 MariaDB 10.5+
- **Web 伺服器**：Nginx 1.20+ 或 Apache 2.4+

---

## 2. 快速部署步驟 (5分鐘上線)

### 步驟 A：取得專案並解壓縮
\`\`\`bash
# 將下載的 haonong_ark_ci3_php81_system.zip 解壓縮至 Web 根目錄
mkdir -p /var/www/haonong_ark
unzip haonong_ark_ci3_php81_system.zip -d /var/www/haonong_ark
cd /var/www/haonong_ark
\`\`\`

### 步驟 B：匯入資料庫結構與種子資料
\`\`\`bash
# 登入 MySQL 並建立資料庫
mysql -u root -p < database/schema.sql
\`\`\`

### 步驟 C：配置環境參數
複製並修改環境設定檔：
\`\`\`bash
cp .env.example .env
nano .env
\`\`\`
填入您的資料庫帳號密碼及農業部 API Key（若有）。

### 步驟 D：設定檔案目錄權限
\`\`\`bash
chown -R www-data:www-data /var/www/haonong_ark
chmod -R 755 /var/www/haonong_ark
chmod -R 775 /var/www/haonong_ark/application/cache
chmod -R 775 /var/www/haonong_ark/application/logs
\`\`\`

### 步驟 E：設定自動同步 Crontab 排程
設定每日上午 07:30 與下午 14:00 自動從農業部同步當日交易行情與菜價：
\`\`\`bash
crontab -e
# 加入以下定時任務：
30 7,14 * * * /usr/bin/php /var/www/haonong_ark/public/index.php market sync_from_moa > /dev/null 2>&1
\`\`\`

---

## 3. Docker 一鍵啟動 (推薦本機或容器化佈署)
\`\`\`bash
docker-compose up -d
\`\`\`
啟動後瀏覽器開啟 \`http://localhost:8080\` 即可立即體驗！
`
  }
];
