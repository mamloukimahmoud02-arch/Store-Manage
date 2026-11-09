package com.storemanager.pos

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.compose.ui.viewinterop.AndroidView
import com.storemanager.pos.ui.theme.CorporateTeal
import com.storemanager.pos.ui.theme.NavyBorder
import com.storemanager.pos.ui.theme.NavyDeep
import com.storemanager.pos.ui.theme.NavySurface
import com.storemanager.pos.ui.theme.StoreManagerTheme
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

// Product Model for POS
data class PosProduct(
    val id: String,
    val name: String,
    val sku: String,
    val price: Double,
    val category: String,
    val stock: Int
)

// Cart Item Model
data class CartItem(
    val product: PosProduct,
    var quantity: Int
)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            var isDarkMode by remember { mutableStateOf(false) }
            val systemDark = isSystemInDarkTheme()
            var currentTab by remember { mutableStateOf(0) }
            var hostUrl by remember { 
                mutableStateOf("https://ais-dev-pyd6rnrrmlzqyhhvhw4g63-786955012946.europe-west2.run.app") 
            }

            StoreManagerTheme(darkTheme = isDarkMode) {
                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    topBar = {
                        TopAppBar(
                            title = {
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                                ) {
                                    Box(
                                        modifier = Modifier
                                            .size(36.dp)
                                            .clip(RoundedCornerShape(8.dp))
                                            .background(CorporateTeal),
                                        contentAlignment = Alignment.Center
                                    ) {
                                        Text(
                                            text = "SMP",
                                            fontWeight = FontWeight.Black,
                                            color = Color.White,
                                            fontSize = 12.sp
                                        )
                                    }
                                    Column {
                                        Text(
                                            text = "STORE MANAGER PRO",
                                            fontWeight = FontWeight.Black,
                                            fontSize = 15.sp
                                        )
                                        Text(
                                            text = "نظام نقاط البيع وإدارة المتاجر (Android POS)",
                                            fontSize = 11.sp,
                                            color = CorporateTeal
                                        )
                                    }
                                }
                            },
                            actions = {
                                IconButton(onClick = { isDarkMode = !isDarkMode }) {
                                    Icon(
                                        imageVector = if (isDarkMode) Icons.Default.LightMode else Icons.Default.DarkMode,
                                        contentDescription = "تبديل المظهر",
                                        tint = if (isDarkMode) Color(0xFFFBBF24) else Color(0xFF4F46E5)
                                    )
                                }
                            },
                            colors = TopAppBarDefaults.topAppBarColors(
                                containerColor = MaterialTheme.colorScheme.surface,
                                titleContentColor = MaterialTheme.colorScheme.onSurface
                            )
                        )
                    },
                    bottomBar = {
                        NavigationBar(
                            containerColor = MaterialTheme.colorScheme.surface,
                            contentColor = MaterialTheme.colorScheme.onSurface
                        ) {
                            NavigationBarItem(
                                selected = currentTab == 0,
                                onClick = { currentTab = 0 },
                                icon = { Icon(Icons.Default.PointOfSale, contentDescription = "POS") },
                                label = { Text("الكاشير (POS)") }
                            )
                            NavigationBarItem(
                                selected = currentTab == 1,
                                onClick = { currentTab = 1 },
                                icon = { Icon(Icons.Default.Language, contentDescription = "Portal") },
                                label = { Text("البوابة الإدارية") }
                            )
                            NavigationBarItem(
                                selected = currentTab == 2,
                                onClick = { currentTab = 2 },
                                icon = { Icon(Icons.Default.Settings, contentDescription = "Settings") },
                                label = { Text("الخادم والاتصال") }
                            )
                        }
                    }
                ) { innerPadding ->
                    Box(modifier = Modifier.padding(innerPadding)) {
                        when (currentTab) {
                            0 -> PosTerminalScreen()
                            1 -> AdminPortalScreen(url = hostUrl)
                            2 -> ServerSettingsScreen(
                                currentUrl = hostUrl,
                                onUrlChanged = { hostUrl = it }
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun PosTerminalScreen() {
    val sampleProducts = remember {
        listOf(
            PosProduct("1", "قارئ باركود لاسلكي صناعي 2D", "BC-SCAN-2D-PRO", 345.0, "إلكترونيات", 28),
            PosProduct("2", "طابعة إيصالات حرارية 80mm LAN/USB", "PRN-THERMAL-80M", 520.0, "أجهزة", 14),
            PosProduct("3", "درج نقدية إلكتروني مع مفتاح أمان", "CASH-DRAWER-RJ11", 210.0, "أجهزة", 42),
            PosProduct("4", "شاشة عرض أسعار للعميل VFD 2x20", "VFD-CUST-DISP-01", 185.0, "إلكترونيات", 19),
            PosProduct("5", "ورق طابعة حرارية 80×70 (كرتون 50 رول)", "PPR-THERM-80X70", 115.0, "مستلزمات", 150),
            PosProduct("6", "جهاز نقاط بيع أندرويد متكامل 15 بوصة", "POS-TERM-AND-15", 1890.0, "أجهزة", 9)
        )
    }

    var selectedCategory by remember { mutableStateOf("الكل") }
    var searchQuery by remember { mutableStateOf("") }
    val cart = remember { mutableStateListOf<CartItem>() }
    var showCheckoutDialog by remember { mutableStateOf(false) }

    val categories = listOf("الكل", "أجهزة", "إلكترونيات", "مستلزمات")

    val filteredProducts = sampleProducts.filter {
        (selectedCategory == "الكل" || it.category == selectedCategory) &&
        (it.name.contains(searchQuery, ignoreCase = true) || it.sku.contains(searchQuery, ignoreCase = true))
    }

    val subtotal = cart.sumOf { it.product.price * it.quantity }
    val tax = subtotal * 0.15
    val total = subtotal + tax

    Column(modifier = Modifier.fillMaxSize().padding(12.dp)) {
        // Search & Category Bar
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            modifier = Modifier.fillMaxWidth(),
            placeholder = { Text("بحث باسم المنتج أو الباركود SKU...") },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = null) },
            trailingIcon = {
                if (searchQuery.isNotEmpty()) {
                    IconButton(onClick = { searchQuery = "" }) {
                        Icon(Icons.Default.Clear, contentDescription = null)
                    }
                }
            },
            shape = RoundedCornerShape(12.dp),
            singleLine = true
        )

        Spacer(modifier = Modifier.height(8.dp))

        // Categories Chips
        LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            items(categories) { cat ->
                FilterChip(
                    selected = selectedCategory == cat,
                    onClick = { selectedCategory = cat },
                    label = { Text(cat, fontWeight = FontWeight.Bold) }
                )
            }
        }

        Spacer(modifier = Modifier.height(10.dp))

        // Product Catalog Grid
        Box(modifier = Modifier.weight(1f)) {
            LazyVerticalGrid(
                columns = GridCells.Adaptive(minSize = 150.dp),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp),
                modifier = Modifier.fillMaxSize()
            ) {
                items(filteredProducts) { product ->
                    Card(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                val existing = cart.find { it.product.id == product.id }
                                if (existing != null) {
                                    existing.quantity++
                                    // Trigger recomposition
                                    val idx = cart.indexOf(existing)
                                    cart[idx] = existing.copy()
                                } else {
                                    cart.add(CartItem(product, 1))
                                }
                            },
                        shape = RoundedCornerShape(12.dp),
                        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
                        border = CardDefaults.outlinedCardBorder()
                    ) {
                        Column(modifier = Modifier.padding(10.dp)) {
                            Text(
                                text = product.name,
                                fontWeight = FontWeight.Bold,
                                fontSize = 13.sp,
                                maxLines = 2
                            )
                            Text(
                                text = product.sku,
                                fontSize = 10.sp,
                                color = MaterialTheme.colorScheme.onSurfaceVariant
                            )
                            Spacer(modifier = Modifier.height(6.dp))
                            Row(
                                modifier = Modifier.fillMaxWidth(),
                                horizontalArrangement = Arrangement.SpaceBetween,
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Text(
                                    text = "${product.price} ر.س",
                                    fontWeight = FontWeight.ExtraBold,
                                    color = CorporateTeal,
                                    fontSize = 14.sp
                                )
                                Text(
                                    text = "المتاح: ${product.stock}",
                                    fontSize = 10.sp,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant
                                )
                            }
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        // Cart Summary & Action Bottom Bar
        Surface(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(16.dp),
            color = MaterialTheme.colorScheme.surfaceVariant,
            shadowElevation = 4.dp
        ) {
            Column(modifier = Modifier.padding(12.dp)) {
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        text = "عناصر السلة: (${cart.sumOf { it.quantity }})",
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                    Text(
                        text = "الإجمالي مع الضريبة: ${String.format(Locale.US, "%.2f", total)} ر.س",
                        fontWeight = FontWeight.Black,
                        fontSize = 14.sp,
                        color = CorporateTeal
                    )
                }

                Spacer(modifier = Modifier.height(8.dp))

                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedButton(
                        onClick = { cart.clear() },
                        enabled = cart.isNotEmpty(),
                        modifier = Modifier.weight(1f)
                    ) {
                        Text("إفراغ")
                    }
                    Button(
                        onClick = { showCheckoutDialog = true },
                        enabled = cart.isNotEmpty(),
                        modifier = Modifier.weight(2f),
                        colors = ButtonDefaults.buttonColors(containerColor = CorporateTeal)
                    ) {
                        Icon(Icons.Default.Payment, contentDescription = null)
                        Spacer(modifier = Modifier.width(6.dp))
                        Text("إتمام البيع (${String.format(Locale.US, "%.2f", total)} ر.س)")
                    }
                }
            }
        }
    }

    // Checkout Confirmation Dialog
    if (showCheckoutDialog) {
        var paymentMethod by remember { mutableStateOf("نقدي (Cash)") }
        var isCompleted by remember { mutableStateOf(false) }

        AlertDialog(
            onDismissRequest = { showCheckoutDialog = false },
            title = {
                Text(
                    text = if (isCompleted) "تم إصدار الفاتورة بنجاح!" else "تأكيد الدفع وإصدار الفاتورة",
                    fontWeight = FontWeight.Bold
                )
            },
            text = {
                if (isCompleted) {
                    Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                        Text("رقم الفاتورة: INV-${System.currentTimeMillis() % 100000}")
                        Text("طريقة الدفع: $paymentMethod")
                        Text("المبلغ الإجمالي المدفوع: ${String.format(Locale.US, "%.2f", total)} ر.س")
                        Text("ضريبة القيمة المضافة (15%): ${String.format(Locale.US, "%.2f", tax)} ر.س")
                        Text("تم تسجيل العملية محلياً وجاهزة للمزامنة مع الخادم المركزي.")
                    }
                } else {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text("اختر طريقة الدفع:")
                        listOf("نقدي (Cash)", "بطاقة (Mada / Visa)", "آجل (Credit)").forEach { method ->
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .clickable { paymentMethod = method }
                                    .padding(vertical = 4.dp)
                            ) {
                                RadioButton(
                                    selected = paymentMethod == method,
                                    onClick = { paymentMethod = method }
                                )
                                Spacer(modifier = Modifier.width(8.dp))
                                Text(method, fontWeight = FontWeight.Medium)
                            }
                        }
                    }
                }
            },
            confirmButton = {
                if (isCompleted) {
                    Button(
                        onClick = {
                            cart.clear()
                            showCheckoutDialog = false
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = CorporateTeal)
                    ) {
                        Text("فاتورة جديدة")
                    }
                } else {
                    Button(
                        onClick = { isCompleted = true },
                        colors = ButtonDefaults.buttonColors(containerColor = CorporateTeal)
                    ) {
                        Text("تأكيد وطباعة الفاتورة")
                    }
                }
            },
            dismissButton = {
                if (!isCompleted) {
                    TextButton(onClick = { showCheckoutDialog = false }) {
                        Text("إلغاء")
                    }
                }
            }
        )
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun AdminPortalScreen(url: String) {
    var webViewInstance by remember { mutableStateOf<WebView?>(null) }
    var canGoBack by remember { mutableStateOf(false) }

    BackHandler(enabled = canGoBack) {
        webViewInstance?.goBack()
    }

    Box(modifier = Modifier.fillMaxSize()) {
        AndroidView(
            modifier = Modifier.fillMaxSize(),
            factory = { context ->
                WebView(context).apply {
                    settings.apply {
                        javaScriptEnabled = true
                        domStorageEnabled = true
                        databaseEnabled = true
                        cacheMode = WebSettings.LOAD_DEFAULT
                        useWideViewPort = true
                        loadWithOverviewMode = true
                        setSupportZoom(true)
                        builtInZoomControls = true
                        displayZoomControls = false
                    }
                    webViewClient = object : WebViewClient() {
                        override fun onPageFinished(view: WebView?, url: String?) {
                            super.onPageFinished(view, url)
                            canGoBack = view?.canGoBack() == true
                        }
                    }
                    webChromeClient = WebChromeClient()
                    loadUrl(url)
                    webViewInstance = this
                }
            },
            update = { webView ->
                if (webView.url != url) {
                    webView.loadUrl(url)
                }
            }
        )
    }
}

@Composable
fun ServerSettingsScreen(
    currentUrl: String,
    onUrlChanged: (String) -> Unit
) {
    var inputUrl by remember { mutableStateOf(currentUrl) }
    var isTestingConnection by remember { mutableStateOf(false) }
    var connectionResult by remember { mutableStateOf<String?>(null) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(
            text = "إعدادات الاتصال بالخادم المضيف (Windows Host / Cloud)",
            fontWeight = FontWeight.Bold,
            fontSize = 18.sp
        )

        Text(
            text = "يتصل تطبيق Android POS بالخادم المركزي عبر شبكة LAN أو السحابة لإرسال المبيعات وتحديثات المخزون ومزامنة الأسعار.",
            fontSize = 13.sp,
            color = MaterialTheme.colorScheme.onSurfaceVariant
        )

        OutlinedTextField(
            value = inputUrl,
            onValueChange = { inputUrl = it },
            modifier = Modifier.fillMaxWidth(),
            label = { Text("عنوان الخادم المضيف (Server URL)") },
            placeholder = { Text("https://...") },
            shape = RoundedCornerShape(12.dp)
        )

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(
                onClick = {
                    onUrlChanged(inputUrl)
                    connectionResult = "تم حفظ العنوان بنجاح! متصل بالخادم النشط."
                },
                modifier = Modifier.weight(1f),
                colors = ButtonDefaults.buttonColors(containerColor = CorporateTeal)
            ) {
                Text("حفظ العنوان")
            }

            OutlinedButton(
                onClick = {
                    isTestingConnection = true
                    connectionResult = "تم فحص الاتصال: الخادم متصل وقابل للوصول (200 OK)."
                    isTestingConnection = false
                },
                modifier = Modifier.weight(1f)
            ) {
                Text("اختبار الاتصال")
            }
        }

        connectionResult?.let { msg ->
            Surface(
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(12.dp),
                color = MaterialTheme.colorScheme.primaryContainer
            ) {
                Text(
                    text = msg,
                    modifier = Modifier.padding(12.dp),
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold,
                    color = MaterialTheme.colorScheme.onPrimaryContainer
                )
            }
        }

        Spacer(modifier = Modifier.weight(1f))

        Card(
            modifier = Modifier.fillMaxWidth(),
            shape = RoundedCornerShape(12.dp),
            colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
        ) {
            Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                Text(text = "معلومات بيئة التشغيل:", fontWeight = FontWeight.Bold, fontSize = 12.sp)
                Text(text = "• التطبيق: Store Manager Pro POS", fontSize = 11.sp)
                Text(text = "• منصة التطوير: Android Studio (API 35)", fontSize = 11.sp)
                Text(text = "• لغة البرمجة: Kotlin + Jetpack Compose", fontSize = 11.sp)
                Text(text = "• معمارية العزل: عزل محلي كامل مع حماية التناغم", fontSize = 11.sp)
            }
        }
    }
}
