# Generated by Django 4.2.7 on 2023-12-31 07:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0013_alter_product_image1'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image1',
            field=models.ImageField(blank=True, default='/images/placeholder.png', null=True, upload_to='products/'),
        ),
    ]
