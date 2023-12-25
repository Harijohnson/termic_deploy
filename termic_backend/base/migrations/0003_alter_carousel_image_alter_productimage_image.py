# Generated by Django 4.2.7 on 2023-12-25 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_remove_product_image_productimage_carousel_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carousel',
            name='image',
            field=models.ImageField(blank=True, default='carousel_images/placeholder.png', null=True, upload_to='base/static/images/corousel'),
        ),
        migrations.AlterField(
            model_name='productimage',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='base/static/images/products'),
        ),
    ]
