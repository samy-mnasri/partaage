<?php if ( has_nav_menu( 'new-header-menu' ) ) : ?>
  <div class="nav-menu-primary">
    <?php 
      wp_nav_menu ( array (
        'theme_location' => 'new-header-menu' ,
        'menu_class' => 'primary-menu-ul', // classe CSS pour customiser mon menu
      ) );
    ?>
  </div>
 <?php endif; ?>